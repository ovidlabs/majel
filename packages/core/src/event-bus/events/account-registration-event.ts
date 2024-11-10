import { RequestContext } from '../../api/common/request-context'
import { User } from '../../entity/user/user.entity'
import { MajelEvent } from '../majel-event'

/**
 * @description
 * This event is fired when a new user registers an account, either as a stand-alone signup or after
 * placing an order.
 *
 * @docsCategory events
 * @docsPage Event Types
 */
export class AccountRegistrationEvent extends MajelEvent {
	constructor(
		public ctx: RequestContext,
		public user: User,
	) {
		super()
	}
}
