import { RequestContext } from '../../api/common/request-context'
import { Order, Refund } from '../../entity'
import { MajelEvent } from '../majel-event'

/**
 * @description
 * This event is fired whenever a {@link Refund} is created
 *
 * @docsCategory events
 * @docsPage Event Types
 */
export class RefundEvent extends MajelEvent {
	constructor(
		public ctx: RequestContext,
		public order: Order,
		public refund: Refund,
		public type: 'created',
	) {
		super()
	}
}
