import { CreatePromotionInput, UpdatePromotionInput } from '@majel/common/lib/generated-types'
import { ID } from '@majel/common/lib/shared-types'

import { RequestContext } from '../../api/common/request-context'
import { Promotion } from '../../entity'
import { MajelEntityEvent } from '../majel-entity-event'

type PromotionInputTypes = CreatePromotionInput | UpdatePromotionInput | ID

/**
 * @description
 * This event is fired whenever a {@link Promotion} is added, updated
 * or deleted.
 *
 * @docsCategory events
 * @docsPage Event Types
 */
export class PromotionEvent extends MajelEntityEvent<Promotion, PromotionInputTypes> {
	constructor(
		ctx: RequestContext,
		entity: Promotion,
		type: 'created' | 'updated' | 'deleted',
		input?: PromotionInputTypes,
	) {
		super(entity, type, ctx, input)
	}
}
