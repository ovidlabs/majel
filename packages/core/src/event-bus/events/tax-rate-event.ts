import { CreateTaxRateInput, UpdateTaxRateInput } from '@majel/common/lib/generated-types'
import { ID } from '@majel/common/lib/shared-types'

import { RequestContext } from '../../api/common/request-context'
import { TaxRate } from '../../entity'
import { MajelEntityEvent } from '../majel-entity-event'

type TaxRateInputTypes = CreateTaxRateInput | UpdateTaxRateInput | ID

/**
 * @description
 * This event is fired whenever a {@link TaxRate} is added, updated
 * or deleted.
 *
 * @docsCategory events
 * @docsPage Event Types
 */
export class TaxRateEvent extends MajelEntityEvent<TaxRate, TaxRateInputTypes> {
	constructor(
		ctx: RequestContext,
		entity: TaxRate,
		type: 'created' | 'updated' | 'deleted',
		input?: TaxRateInputTypes,
	) {
		super(entity, type, ctx, input)
	}
}
