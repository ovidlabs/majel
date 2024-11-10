import { CreateCustomerGroupInput, UpdateCustomerGroupInput } from '@majel/common/lib/generated-types'
import { ID } from '@majel/common/lib/shared-types'

import { RequestContext } from '../../api'
import { CustomerGroup } from '../../entity'
import { MajelEntityEvent } from '../majel-entity-event'

type CustomerGroupInputTypes = CreateCustomerGroupInput | UpdateCustomerGroupInput | ID

/**
 * @description
 * This event is fired whenever a {@link CustomerGroup} is added, updated or deleted.
 *
 * @docsCategory events
 * @docsPage Event Types
 * @since 1.4
 */
export class CustomerGroupEvent extends MajelEntityEvent<CustomerGroup, CustomerGroupInputTypes> {
	constructor(
		ctx: RequestContext,
		entity: CustomerGroup,
		type: 'created' | 'updated' | 'deleted',
		input?: CustomerGroupInputTypes,
	) {
		super(entity, type, ctx, input)
	}
}
