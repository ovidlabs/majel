import { LanguageCode } from '@majel/common/lib/generated-types'
import { DeepPartial } from '@majel/common/lib/shared-types'
import { Column, Entity, Index, ManyToOne } from 'typeorm'

import { Translation } from '../../common/types/locale-types'
import { HasCustomFields } from '../../config/custom-field/custom-field-types'
import { MajelEntity } from '../base/base.entity'
import { CustomProductVariantFieldsTranslation } from '../custom-entity-fields'

import { ProductVariant } from './product-variant.entity'

@Entity()
export class ProductVariantTranslation
	extends MajelEntity
	implements Translation<ProductVariant>, HasCustomFields
{
	constructor(input?: DeepPartial<Translation<ProductVariant>>) {
		super(input)
	}

	@Column('varchar') languageCode: LanguageCode

	@Column() name: string

	@Index()
	@ManyToOne(type => ProductVariant, base => base.translations, { onDelete: 'CASCADE' })
	base: ProductVariant

	@Column(type => CustomProductVariantFieldsTranslation)
	customFields: CustomProductVariantFieldsTranslation
}
