import { LanguageCode } from '@majel/common/lib/generated-types'
import { DeepPartial } from '@majel/common/lib/shared-types'
import { Column, Entity, Index, ManyToOne } from 'typeorm'

import { Translation } from '../../common/types/locale-types'
import { HasCustomFields } from '../../config/custom-field/custom-field-types'
import { MajelEntity } from '../base/base.entity'
import { CustomProductOptionGroupFieldsTranslation } from '../custom-entity-fields'

import { ProductOptionGroup } from './product-option-group.entity'

@Entity()
export class ProductOptionGroupTranslation
	extends MajelEntity
	implements Translation<ProductOptionGroup>, HasCustomFields
{
	constructor(input?: DeepPartial<Translation<ProductOptionGroup>>) {
		super(input)
	}

	@Column('varchar') languageCode: LanguageCode

	@Column() name: string

	@Index()
	@ManyToOne(type => ProductOptionGroup, base => base.translations, { onDelete: 'CASCADE' })
	base: ProductOptionGroup

	@Column(type => CustomProductOptionGroupFieldsTranslation)
	customFields: CustomProductOptionGroupFieldsTranslation
}
