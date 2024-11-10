import { LanguageCode } from '@majel/common/lib/generated-types'
import { DeepPartial } from '@majel/common/lib/shared-types'
import { Column, Entity, Index, ManyToOne } from 'typeorm'

import { Translation } from '../../common/types/locale-types'
import { HasCustomFields } from '../../config/custom-field/custom-field-types'
import { MajelEntity } from '../base/base.entity'
import { CustomShippingMethodFieldsTranslation } from '../custom-entity-fields'
import { Product } from '../product/product.entity'

import { ShippingMethod } from './shipping-method.entity'

@Entity()
export class ShippingMethodTranslation
	extends MajelEntity
	implements Translation<ShippingMethod>, HasCustomFields
{
	constructor(input?: DeepPartial<Translation<Product>>) {
		super(input)
	}

	@Column('varchar') languageCode: LanguageCode

	@Column({ default: '' }) name: string

	@Column({ default: '' }) description: string

	@Index()
	@ManyToOne(type => ShippingMethod, base => base.translations, { onDelete: 'CASCADE' })
	base: ShippingMethod

	@Column(type => CustomShippingMethodFieldsTranslation)
	customFields: CustomShippingMethodFieldsTranslation
}
