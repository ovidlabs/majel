import { CreateProductVariantInput, UpdateProductVariantInput } from '@majel/common/lib/generated-types'
import { ID } from '@majel/common/lib/shared-types'

import { RequestContext } from '../../api/common/request-context'
import { ProductVariant } from '../../entity'
import { MajelEntityEvent } from '../majel-entity-event'

type ProductVariantInputTypes = CreateProductVariantInput[] | UpdateProductVariantInput[] | ID | ID[]

/**
 * @description
 * This event is fired whenever a {@link ProductVariant} is added, updated
 * or deleted.
 *
 * @docsCategory events
 * @docsPage Event Types
 */
export class ProductVariantEvent extends MajelEntityEvent<ProductVariant[], ProductVariantInputTypes> {
	constructor(
		ctx: RequestContext,
		entity: ProductVariant[],
		type: 'created' | 'updated' | 'deleted',
		input?: ProductVariantInputTypes,
	) {
		super(entity, type, ctx, input)
	}

	/**
	 * Return an variants field to become compatible with the
	 * deprecated old version of ProductEvent
	 * @deprecated Use `entity` instead
	 * @since 1.4
	 */
	get variants(): ProductVariant[] {
		return this.entity
	}
}
