import { CreateCustomerInput, UpdateCustomerInput } from '@majel/common/lib/generated-types'
import { ID } from '@majel/common/lib/shared-types'

import { RequestContext } from '../../api/common/request-context'
import { Customer } from '../../entity/customer/customer.entity'
import { MajelEntityEvent } from '../majel-entity-event'

type CustomerInputTypes =
	| CreateCustomerInput
	| UpdateCustomerInput
	| (Partial<CreateCustomerInput> & { emailAddress: string })
	| ID

/**
 * @description
 * This event is fired whenever a {@link Customer} is added, updated
 * or deleted.
 *
 * @docsCategory events
 * @docsPage Event Types
 */
export class CustomerEvent extends MajelEntityEvent<Customer, CustomerInputTypes> {
	constructor(
		ctx: RequestContext,
		entity: Customer,
		type: 'created' | 'updated' | 'deleted',
		input?: CustomerInputTypes,
	) {
		super(entity, type, ctx, input)
	}

	/**
	 * Return an customer field to become compatible with the
	 * deprecated old version of CustomerEvent
	 * @deprecated Use `entity` instead
	 * @since 1.4
	 */
	get customer(): Customer {
		return this.entity
	}
}
