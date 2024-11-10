import { RequestContext } from '../../api/common/request-context'
import { Order } from '../../entity'
import { MajelEvent } from '../majel-event'

/**
 * @description
 * This event is fired whenever an {@link Order} is added, updated
 * or deleted.
 *
 * @docsCategory events
 * @docsPage Event Types
 */
export class OrderEvent extends MajelEvent {
	constructor(
		public ctx: RequestContext,
		public order: Order,
		public type: 'created' | 'updated' | 'deleted',
	) {
		super()
	}
}
