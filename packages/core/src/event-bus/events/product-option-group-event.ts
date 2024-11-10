import {
	CreateProductOptionGroupInput,
	UpdateProductOptionGroupInput,
} from '@majel/common/lib/generated-types'
import { ID } from '@majel/common/lib/shared-types'

import { RequestContext } from '../../api/common/request-context'
import { ProductOptionGroup } from '../../entity'
import { MajelEntityEvent } from '../majel-entity-event'

type ProductOptionGroupInputTypes =
	| Omit<CreateProductOptionGroupInput, 'options'>
	| UpdateProductOptionGroupInput
	| ID

/**
 * @description
 * This event is fired whenever a {@link ProductOptionGroup} is added or updated.
 *
 * @docsCategory events
 * @docsPage Event Types
 * @since 1.4
 */
export class ProductOptionGroupEvent extends MajelEntityEvent<
	ProductOptionGroup,
	ProductOptionGroupInputTypes
> {
	constructor(
		ctx: RequestContext,
		entity: ProductOptionGroup,
		type: 'created' | 'updated' | 'deleted',
		input?: ProductOptionGroupInputTypes,
	) {
		super(entity, type, ctx, input)
	}
}
