import { ID } from '@majel/common/lib/shared-types'

import { RequestContext } from '../../api/common/request-context'
import { Product } from '../../entity'
import { MajelEvent } from '../majel-event'

/**
 * @description
 * This event is fired whenever a {@link ProductOptionGroup} is assigned or removed from a {@link Product}.
 *
 * @docsCategory events
 * @docsPage Event Types
 * @since 1.4
 */
export class ProductOptionGroupChangeEvent extends MajelEvent {
	constructor(
		public ctx: RequestContext,
		public product: Product,
		public optionGroupId: ID,
		public type: 'assigned' | 'removed',
	) {
		super()
	}
}
