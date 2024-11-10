import { Module, Provider, Type as NestType } from '@nestjs/common'
import { MODULE_METADATA } from '@nestjs/common/constants'
import { ModuleMetadata } from '@nestjs/common/interfaces'
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { pick } from '@majel/common/lib/pick'
import { Type } from '@majel/common/lib/shared-types'
import { DocumentNode, GraphQLScalarType } from 'graphql'

import { RuntimeMajelConfig } from '../config/majel-config'

import { PLUGIN_METADATA } from './plugin-metadata'

/**
 * @description
 * Defines the metadata of a Majel plugin. This interface is an superset of the [Nestjs ModuleMetadata](https://docs.nestjs.com/modules)
 * (which allows the definition of `imports`, `exports`, `providers` and `controllers`), which means
 * that any Nestjs Module is a valid Majel plugin. In addition, the MajelPluginMetadata allows the definition of
 * extra properties specific to Majel.
 *
 * @docsCategory plugin
 * @docsPage MajelPluginMetadata
 */
export interface MajelPluginMetadata extends ModuleMetadata {
	/**
	 * @description
	 * A function which can modify the {@link MajelConfig} object before the server bootstraps.
	 */
	configuration?: PluginConfigurationFn
	/**
	 * @description
	 * The plugin may extend the default Majel GraphQL shop api by providing extended
	 * schema definitions and any required resolvers.
	 */
	shopApiExtensions?: APIExtensionDefinition
	/**
	 * @description
	 * The plugin may extend the default Majel GraphQL admin api by providing extended
	 * schema definitions and any required resolvers.
	 */
	adminApiExtensions?: APIExtensionDefinition
	/**
	 * @description
	 * The plugin may define custom [TypeORM database entities](https://typeorm.io/#/entities).
	 */
	entities?: Array<Type<any>> | (() => Array<Type<any>>)
	/**
	 * @description
	 * The plugin should define a valid [semver version string](https://www.npmjs.com/package/semver) to indicate which versions of
	 * Majel core it is compatible with. Attempting to use a plugin with an incompatible
	 * version of Majel will result in an error and the server will be unable to bootstrap.
	 *
	 * If a plugin does not define this property, a message will be logged on bootstrap that the plugin is not
	 * guaranteed to be compatible with the current version of Majel.
	 *
	 * To effectively disable this check for a plugin, you can use an overly-permissive string such as `>0.0.0`.
	 *
	 * @example
	 * ```ts
	 * compatibility: '^2.0.0'
	 * ```
	 *
	 * @since 2.0.0
	 */
	compatibility?: string
}
/**
 * @description
 * An object which allows a plugin to extend the Majel GraphQL API.
 *
 * @docsCategory plugin
 * @docsPage MajelPluginMetadata
 * */

export interface APIExtensionDefinition {
	/**
	 * @description
	 * Extensions to the schema.
	 *
	 * @example
	 * ```ts
	 * const schema = gql`extend type SearchReindexResponse {
	 *     timeTaken: Int!
	 *     indexedItemCount: Int!
	 * }`;
	 * ```
	 */
	schema?: DocumentNode | (() => DocumentNode | undefined)
	/**
	 * @description
	 * An array of resolvers for the schema extensions. Should be defined as [Nestjs GraphQL resolver](https://docs.nestjs.com/graphql/resolvers-map)
	 * classes, i.e. using the Nest `\@Resolver()` decorator etc.
	 */
	resolvers?: Array<Type<any>> | (() => Array<Type<any>>)
	/**
	 * @description
	 * A map of GraphQL scalar types which should correspond to any custom scalars defined in your schema.
	 * Read more about defining custom scalars in the
	 * [Apollo Server Custom Scalars docs](https://www.apollographql.com/docs/apollo-server/schema/custom-scalars)
	 *
	 * @since 1.7.0
	 */
	scalars?: Record<string, GraphQLScalarType> | (() => Record<string, GraphQLScalarType>)
}

/**
 * @description
 * This method is called before the app bootstraps and should be used to perform any needed modifications to the {@link MajelConfig}.
 *
 * @docsCategory plugin
 * @docsPage MajelPluginMetadata
 */
export type PluginConfigurationFn = (
	config: RuntimeMajelConfig,
) => RuntimeMajelConfig | Promise<RuntimeMajelConfig>

/**
 * @description
 * The MajelPlugin decorator is a means of configuring and/or extending the functionality of the Majel server. A Majel plugin is
 * a [Nestjs Module](https://docs.nestjs.com/modules), with optional additional metadata defining things like extensions to the GraphQL API, custom
 * configuration or new database entities.
 *
 * As well as configuring the app, a plugin may also extend the GraphQL schema by extending existing types or adding
 * entirely new types. Database entities and resolvers can also be defined to handle the extended GraphQL types.
 *
 * @example
 * ```ts
 * import { Controller, Get } from '\@nestjs/common';
 * import { Ctx, PluginCommonModule, ProductService, RequestContext, MajelPlugin } from '\@majel/core';
 *
 * \@Controller('products')
 * export class ProductsController {
 *     constructor(private productService: ProductService) {}
 *
 *     \@Get()
 *     findAll(\@Ctx() ctx: RequestContext) {
 *         return this.productService.findAll(ctx);
 *     }
 * }
 *
 *
 * //A simple plugin which adds a REST endpoint for querying products.
 * \@MajelPlugin({
 *     imports: [PluginCommonModule],
 *     controllers: [ProductsController],
 * })
 * export class RestPlugin {}
 * ```
 *
 * @docsCategory plugin
 */
export function MajelPlugin(pluginMetadata: MajelPluginMetadata): ClassDecorator {
	// eslint-disable-next-line @typescript-eslint/ban-types
	return (target: Function) => {
		for (const metadataProperty of Object.values(PLUGIN_METADATA)) {
			const property = metadataProperty as keyof MajelPluginMetadata
			if (pluginMetadata[property] != null) {
				Reflect.defineMetadata(property, pluginMetadata[property], target)
			}
		}
		const nestModuleMetadata = pick(pluginMetadata, Object.values(MODULE_METADATA) as any)
		// Automatically add any of the Plugin's "providers" to the "exports" array. This is done
		// because when a plugin defines GraphQL resolvers, these resolvers are used to dynamically
		// created a new Module in the ApiModule, and if those resolvers depend on any providers,
		// the must be exported. See the function {@link createDynamicGraphQlModulesForPlugins}
		// for the implementation.
		// However, we must omit any global providers (https://github.com/majel-ecommerce/majel/issues/837)
		const nestGlobalProviderTokens = [APP_INTERCEPTOR, APP_FILTER, APP_GUARD, APP_PIPE]
		const exportedProviders = (nestModuleMetadata.providers || []).filter(provider => {
			if (isNamedProvider(provider)) {
				if (nestGlobalProviderTokens.includes(provider.provide as any)) {
					return false
				}
			}
			return true
		})
		nestModuleMetadata.exports = [...(nestModuleMetadata.exports || []), ...exportedProviders]
		Module(nestModuleMetadata)(target)
	}
}

function isNamedProvider(provider: Provider): provider is Exclude<Provider, NestType<any>> {
	return provider.hasOwnProperty('provide')
}
