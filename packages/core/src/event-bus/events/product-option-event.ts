import {
	CreateGroupOptionInput,
	CreateProductOptionInput,
	UpdateProductOptionInput,
} from '@majel/common/lib/generated-types'
import { ID } from '@majel/common/lib/shared-types'

import { RequestContext } from '../../api/common/request-context'
import { ProductOption, ProductOptionGroup } from '../../entity'
import { MajelEntityEvent } from '../majel-entity-event'

type ProductOptionInputTypes =
	| CreateGroupOptionInput
	| CreateProductOptionInput
	| UpdateProductOptionInput
	| ID

/**
 * @description
 * This event is fired whenever a {@link ProductOption} is added or updated.
 *
 * @docsCategory events
 * @docsPage Event Types
 * @since 1.4
 */
export class ProductOptionEvent extends MajelEntityEvent<ProductOption, ProductOptionInputTypes> {
	constructor(
		ctx: RequestContext,
		entity: ProductOption,
		type: 'created' | 'updated' | 'deleted',
		input?: ProductOptionInputTypes,
	) {
		super(entity, type, ctx, input)
	}
}
