import { LanguageCode } from '@majel/common/lib/generated-types'
import { DeepPartial } from '@majel/common/lib/shared-types'
import { Column, Entity, Index, ManyToOne } from 'typeorm'

import { Translation } from '../../common/types/locale-types'
import { HasCustomFields } from '../../config/custom-field/custom-field-types'
import { MajelEntity } from '../base/base.entity'
import { CustomProductOptionFieldsTranslation } from '../custom-entity-fields'

import { ProductOption } from './product-option.entity'

@Entity()
export class ProductOptionTranslation
	extends MajelEntity
	implements Translation<ProductOption>, HasCustomFields
{
	constructor(input?: DeepPartial<Translation<ProductOption>>) {
		super(input)
	}

	@Column('varchar') languageCode: LanguageCode

	@Column() name: string

	@Index()
	@ManyToOne(type => ProductOption, base => base.translations, { onDelete: 'CASCADE' })
	base: ProductOption

	@Column(type => CustomProductOptionFieldsTranslation)
	customFields: CustomProductOptionFieldsTranslation
}
