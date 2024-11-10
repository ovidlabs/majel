import { LanguageCode } from '@majel/common/lib/generated-types'
import { DeepPartial } from '@majel/common/lib/shared-types'
import { Column, Entity, Index, ManyToOne } from 'typeorm'

import { Translation } from '../../common/types/locale-types'
import { HasCustomFields } from '../../config/custom-field/custom-field-types'
import { MajelEntity } from '../base/base.entity'
import { CustomPromotionFieldsTranslation } from '../custom-entity-fields'

import { Promotion } from './promotion.entity'

@Entity()
export class PromotionTranslation extends MajelEntity implements Translation<Promotion>, HasCustomFields {
	constructor(input?: DeepPartial<Translation<Promotion>>) {
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
	@ManyToOne(type => Promotion, base => base.translations, { onDelete: 'CASCADE' })
	base: Promotion

	@Column(type => CustomPromotionFieldsTranslation)
	customFields: CustomPromotionFieldsTranslation
}
