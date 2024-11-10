import { CreateProvinceInput, UpdateProvinceInput } from '@majel/common/lib/generated-types'
import { ID } from '@majel/common/lib/shared-types'

import { RequestContext } from '../../api'
import { Province } from '../../entity/region/province.entity'
import { MajelEntityEvent } from '../majel-entity-event'

type ProvinceInputTypes = CreateProvinceInput | UpdateProvinceInput | ID

/**
 * @description
 * This event is fired whenever a {@link Province} is added, updated or deleted.
 *
 * @docsCategory events
 * @docsPage Event Types
 * @since 2.0
 */
export class ProvinceEvent extends MajelEntityEvent<Province, ProvinceInputTypes> {
	constructor(
		ctx: RequestContext,
		entity: Province,
		type: 'created' | 'updated' | 'deleted',
		input?: ProvinceInputTypes,
	) {
		super(entity, type, ctx, input)
	}
}
