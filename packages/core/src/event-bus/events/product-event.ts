import { CreateProductInput, UpdateProductInput } from '@majel/common/lib/generated-types'
import { ID } from '@majel/common/lib/shared-types'

import { RequestContext } from '../../api/common/request-context'
import { Product } from '../../entity'
import { MajelEntityEvent } from '../majel-entity-event'

type ProductInputTypes = CreateProductInput | UpdateProductInput | ID

/**
 * @description
 * This event is fired whenever a {@link Product} is added, updated
 * or deleted.
 *
 * @docsCategory events
 * @docsPage Event Types
 */
export class ProductEvent extends MajelEntityEvent<Product, ProductInputTypes> {
	constructor(
		ctx: RequestContext,
		entity: Product,
		type: 'created' | 'updated' | 'deleted',
		input?: ProductInputTypes,
	) {
		super(entity, type, ctx, input)
	}

	/**
	 * Return an product field to become compatible with the
	 * deprecated old version of ProductEvent
	 * @deprecated Use `entity` instead
	 * @since 1.4
	 */
	get product(): Product {
		return this.entity
	}
}
