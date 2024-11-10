import { DeepPartial } from '@majel/common/lib/shared-types'
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm'

import { HasCustomFields } from '../../config/custom-field/custom-field-types'
import { FulfillmentState } from '../../service/helpers/fulfillment-state-machine/fulfillment-state'
import { MajelEntity } from '../base/base.entity'
import { CustomFulfillmentFields } from '../custom-entity-fields'
import { Order } from '../order/order.entity'
import { FulfillmentLine } from '../order-line-reference/fulfillment-line.entity'

/**
 * @description
 * This entity represents a fulfillment of an Order or part of it, i.e. which {@link OrderLine}s have been
 * delivered to the Customer after successful payment.
 *
 * @docsCategory entities
 */
@Entity()
export class Fulfillment extends MajelEntity implements HasCustomFields {
	constructor(input?: DeepPartial<Fulfillment>) {
		super(input)
	}

	@Column('varchar') state: FulfillmentState

	@Column({ default: '' })
	trackingCode: string

	@Column()
	method: string

	@Column()
	handlerCode: string

	@OneToMany(type => FulfillmentLine, fulfillmentLine => fulfillmentLine.fulfillment)
	lines: FulfillmentLine[]

	@ManyToMany(type => Order, order => order.fulfillments)
	orders: Order[]

	@Column(type => CustomFulfillmentFields)
	customFields: CustomFulfillmentFields
}
