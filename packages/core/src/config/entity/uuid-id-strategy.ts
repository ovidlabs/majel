import { EntityIdStrategy } from './entity-id-strategy'

/**
 * @description
 * An id strategy which uses string uuids as primary keys
 * for all entities. This strategy can be configured with the
 * `entityIdStrategy` property of the `entityOptions` property
 * of {@link MajelConfig}.
 *
 * @example
 * ```ts
 * import { UuidIdStrategy, MajelConfig } from '\@majel/core';
 *
 * export const config: MajelConfig = {
 *   entityOptions: {
 *     entityIdStrategy: new UuidIdStrategy(),
 *     // ...
 *   }
 * }
 * ```
 *
 * @docsCategory configuration
 * @docsPage EntityIdStrategy
 */
export class UuidIdStrategy implements EntityIdStrategy<'uuid'> {
	readonly primaryKeyType = 'uuid'
	decodeId(id: string): string {
		return id
	}
	encodeId(primaryKey: string): string {
		return primaryKey
	}
}
