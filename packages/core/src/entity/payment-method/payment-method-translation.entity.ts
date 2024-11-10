import { LanguageCode } from '@majel/common/lib/generated-types'
import { DeepPartial } from '@majel/common/lib/shared-types'
import { Column, Entity, Index, ManyToOne } from 'typeorm'

import { Translation } from '../../common/types/locale-types'
import { HasCustomFields } from '../../config/custom-field/custom-field-types'
import { MajelEntity } from '../base/base.entity'
import { CustomPaymentMethodFieldsTranslation } from '../custom-entity-fields'

import { PaymentMethod } from './payment-method.entity'

@Entity()
export class PaymentMethodTranslation
	extends MajelEntity
	implements Translation<PaymentMethod>, HasCustomFields
{
	constructor(input?: DeepPartial<Translation<PaymentMethod>>) {
		super(input)
		// This is a workaround for the fact that
		// MySQL does not support default values on TEXT columns
		if (this.description === undefined) {
			this.description = ''
		}
	}

	@Column('varchar') languageCode: LanguageCode

	@Column() name: string

	@Column('text') description: string

	@Index()
	@ManyToOne(type => PaymentMethod, base => base.translations, { onDelete: 'CASCADE' })
	base: PaymentMethod

	@Column(type => CustomPaymentMethodFieldsTranslation)
	customFields: CustomPaymentMethodFieldsTranslation
}
