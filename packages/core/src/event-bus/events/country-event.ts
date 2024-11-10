import { CreateCountryInput, UpdateCountryInput } from '@majel/common/lib/generated-types'
import { ID } from '@majel/common/lib/shared-types'

import { RequestContext } from '../../api'
import { Country } from '../../entity'
import { MajelEntityEvent } from '../majel-entity-event'

type CountryInputTypes = CreateCountryInput | UpdateCountryInput | ID

/**
 * @description
 * This event is fired whenever a {@link Country} is added, updated or deleted.
 *
 * @docsCategory events
 * @docsPage Event Types
 * @since 1.4
 */
export class CountryEvent extends MajelEntityEvent<Country, CountryInputTypes> {
	constructor(
		ctx: RequestContext,
		entity: Country,
		type: 'created' | 'updated' | 'deleted',
		input?: CountryInputTypes,
	) {
		super(entity, type, ctx, input)
	}
}
