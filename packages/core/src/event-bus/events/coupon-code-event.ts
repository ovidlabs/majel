import { ID } from '@majel/common/lib/shared-types'

import { RequestContext } from '../../api/common/request-context'
import { MajelEvent } from '../majel-event'

/**
 * @description
 * This event is fired whenever an coupon code of an active {@link Promotion}
 * is assigned or removed to an {@link Order}.
 *
 * @docsCategory events
 * @docsPage Event Types
 * @since 1.4
 */
export class CouponCodeEvent extends MajelEvent {
	constructor(
		public ctx: RequestContext,
		public couponCode: string,
		public orderId: ID,
		public type: 'assigned' | 'removed',
	) {
		super()
	}
}
