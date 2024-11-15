import { CreateAddressInput, UpdateAddressInput } from '@majel/common/lib/generated-types'
import { ID } from '@majel/common/lib/shared-types'

import { RequestContext } from '../../api'
import { Address } from '../../entity/address/address.entity'
import { MajelEntityEvent } from '../majel-entity-event'

/**
 * Possible input types for Address mutations
 */
type CustomerAddressInputTypes = CreateAddressInput | UpdateAddressInput | ID

/**
 * @description
 * This event is fired whenever a {@link Address} is added, updated
 * or deleted.
 *
 * @docsCategory events
 * @docsPage Event Types
 * @since 1.4
 */
export class CustomerAddressEvent extends MajelEntityEvent<Address, CustomerAddressInputTypes> {
	constructor(
		public ctx: RequestContext,
		public entity: Address,
		public type: 'created' | 'updated' | 'deleted',
		public input?: CustomerAddressInputTypes,
	) {
		super(entity, type, ctx, input)
	}

	/**
	 * Return an address field to become compatible with the
	 * deprecated old version of CustomerAddressEvent
	 * @deprecated Use `entity` instead
	 */
	get address(): Address {
		return this.entity
	}
}
