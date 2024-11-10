import { RequestContext } from '../../api/common/request-context'
import { Order } from '../../entity/order/order.entity'
import { OrderState } from '../../service/helpers/order-state-machine/order-state'
import { MajelEvent } from '../majel-event'

/**
 * @description
 * This event is fired whenever an {@link Order} transitions from one {@link OrderState} to another.
 *
 * @docsCategory events
 * @docsPage Event Types
 */
export class OrderStateTransitionEvent extends MajelEvent {
	constructor(
		public fromState: OrderState,
		public toState: OrderState,
		public ctx: RequestContext,
		public order: Order,
	) {
		super()
	}
}
