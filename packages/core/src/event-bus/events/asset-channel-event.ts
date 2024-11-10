import { ID } from '@majel/common/lib/shared-types'

import { RequestContext } from '../../api/common/request-context'
import { Asset } from '../../entity'
import { MajelEvent } from '../majel-event'

/**
 * @description
 * This event is fired whenever an {@link Asset} is assigned or removed
 * From a channel.
 *
 * @docsCategory events
 * @docsPage Event Types
 */
export class AssetChannelEvent extends MajelEvent {
	constructor(
		public ctx: RequestContext,
		public asset: Asset,
		public channelId: ID,
		public type: 'assigned' | 'removed',
	) {
		super()
	}
}
