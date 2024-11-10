import { MajelEvent } from '../majel-event'

/**
 * @description
 * This event is fired when majel finished initializing its services inside the {@link InitializerService}
 *
 * @docsCategory events
 * @docsPage Event Types
 * @since 1.7.0
 */
export class InitializerEvent extends MajelEvent {
	constructor() {
		super()
	}
}
