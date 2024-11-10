import { CreateZoneInput, UpdateZoneInput } from '@majel/common/lib/generated-types'
import { ID } from '@majel/common/lib/shared-types'

import { RequestContext } from '../../api/common/request-context'
import { Zone } from '../../entity'
import { MajelEntityEvent } from '../majel-entity-event'

type ZoneInputTypes = CreateZoneInput | UpdateZoneInput | ID

/**
 * @description
 * This event is fired whenever a {@link Zone} is added, updated
 * or deleted.
 *
 * @docsCategory events
 * @docsPage Event Types
 */
export class ZoneEvent extends MajelEntityEvent<Zone, ZoneInputTypes> {
	constructor(
		ctx: RequestContext,
		entity: Zone,
		type: 'created' | 'updated' | 'deleted',
		input?: ZoneInputTypes,
	) {
		super(entity, type, ctx, input)
	}
}
