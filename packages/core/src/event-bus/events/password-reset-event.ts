import { RequestContext } from '../../api/common/request-context'
import { User } from '../../entity/user/user.entity'
import { MajelEvent } from '../majel-event'

/**
 * @description
 * This event is fired when a Customer requests a password reset email.
 *
 * @docsCategory events
 * @docsPage Event Types
 */
export class PasswordResetEvent extends MajelEvent {
	constructor(
		public ctx: RequestContext,
		public user: User,
	) {
		super()
	}
}
