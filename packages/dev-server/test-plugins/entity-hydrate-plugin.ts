/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Args, Query, Resolver } from '@nestjs/graphql'
import {
	Asset,
	Ctx,
	EntityHydrator,
	ID,
	PluginCommonModule,
	Product,
	ProductVariant,
	ProductVariantService,
	RequestContext,
	TransactionalConnection,
	MajelPlugin,
} from '@majel/core'
import gql from 'graphql-tag'

@Resolver()
class TestResolver {
	constructor(
		private productVariantService: ProductVariantService,
		private connection: TransactionalConnection,
		private entityHydrator: EntityHydrator,
	) {}

	@Query()
	async hydrateTest(@Ctx() ctx: RequestContext, @Args() args: { id: ID }) {
		const product = await this.connection.getRepository(ctx, Product).findOne({
			where: { id: args.id },
			relations: ['featuredAsset'],
		})
		await this.entityHydrator.hydrate(ctx, product!, {
			relations: ['facetValues.facet', 'customFields.thumb'],
		})
		return product
	}
}

// A plugin to explore solutions to https://github.com/majel-ecommerce/majel/issues/1103
@MajelPlugin({
	imports: [PluginCommonModule],
	adminApiExtensions: {
		schema: gql`
			extend type Query {
				hydrateTest(id: ID!): JSON
			}
		`,
		resolvers: [TestResolver],
	},
	configuration: config => {
		config.customFields.Product.push({
			name: 'thumb',
			type: 'relation',
			entity: Asset,
		})
		return config
	},
})
export class EntityHydratePlugin {}
