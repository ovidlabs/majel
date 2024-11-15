import {
	CreateFacetValueInput,
	CreateFacetValueWithFacetInput,
	UpdateFacetValueInput,
} from '@majel/common/lib/generated-types'
import { ID } from '@majel/common/lib/shared-types'

import { RequestContext } from '../../api'
import { FacetValue } from '../../entity'
import { MajelEntityEvent } from '../majel-entity-event'

type FacetValueInputTypes =
	| CreateFacetValueInput
	| CreateFacetValueWithFacetInput
	| UpdateFacetValueInput
	| ID

/**
 * @description
 * This event is fired whenever a {@link FacetValue} is added, updated or deleted.
 *
 * @docsCategory events
 * @docsPage Event Types
 * @since 1.4
 */
export class FacetValueEvent extends MajelEntityEvent<FacetValue, FacetValueInputTypes> {
	constructor(
		ctx: RequestContext,
		entity: FacetValue,
		type: 'created' | 'updated' | 'deleted',
		input?: FacetValueInputTypes,
	) {
		super(entity, type, ctx, input)
	}
}
