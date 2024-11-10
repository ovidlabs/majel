import { CurrencyCode } from '@majel/common/lib/generated-types'
import { DeepPartial, ID } from '@majel/common/lib/shared-types'
import { Column, Entity, Index, ManyToOne } from 'typeorm'

import { HasCustomFields } from '../../config/custom-field/custom-field-types'
import { MajelEntity } from '../base/base.entity'
import { CustomProductVariantPriceFields } from '../custom-entity-fields'
import { EntityId } from '../entity-id.decorator'
import { Money } from '../money.decorator'

import { ProductVariant } from './product-variant.entity'

/**
 * @description
 * A ProductVariantPrice is a Channel-specific price for a ProductVariant. For every Channel to
 * which a ProductVariant is assigned, there will be a corresponding ProductVariantPrice entity.
 *
 * @docsCategory entities
 */
@Entity()
export class ProductVariantPrice extends MajelEntity implements HasCustomFields {
	constructor(input?: DeepPartial<ProductVariantPrice>) {
		super(input)
	}

	@Money() price: number

	@EntityId({ nullable: true }) channelId: ID

	@Column('varchar')
	currencyCode: CurrencyCode

	@Index()
	@ManyToOne(type => ProductVariant, variant => variant.productVariantPrices, { onDelete: 'CASCADE' })
	variant: ProductVariant

	@Column(type => CustomProductVariantPriceFields)
	customFields: CustomProductVariantPriceFields
}
