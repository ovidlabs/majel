import { LanguageCode } from '@majel/common/lib/generated-types'
import { DeepPartial } from '@majel/common/lib/shared-types'
import { Column, Entity, Index, ManyToOne } from 'typeorm'

import { Translation } from '../../common/types/locale-types'
import { HasCustomFields } from '../../config/custom-field/custom-field-types'
import { MajelEntity } from '../base/base.entity'
import { CustomProductFieldsTranslation } from '../custom-entity-fields'

import { Product } from './product.entity'

@Entity()
export class ProductTranslation extends MajelEntity implements Translation<Product>, HasCustomFields {
	constructor(input?: DeepPartial<Translation<Product>>) {
		super(input)
	}

	@Column('varchar') languageCode: LanguageCode

	@Column() name: string

	@Index({ unique: false })
	@Column()
	slug: string

	@Column('text') description: string

	@Index()
	@ManyToOne(type => Product, base => base.translations)
	base: Product

	@Column(type => CustomProductFieldsTranslation)
	customFields: CustomProductFieldsTranslation
}
