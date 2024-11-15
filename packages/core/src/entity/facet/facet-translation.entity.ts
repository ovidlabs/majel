import { LanguageCode } from '@majel/common/lib/generated-types'
import { DeepPartial } from '@majel/common/lib/shared-types'
import { Column, Entity, Index, ManyToOne } from 'typeorm'

import { Translation } from '../../common/types/locale-types'
import { HasCustomFields } from '../../config/custom-field/custom-field-types'
import { MajelEntity } from '../base/base.entity'
import { CustomFacetFieldsTranslation } from '../custom-entity-fields'

import { Facet } from './facet.entity'

@Entity()
export class FacetTranslation extends MajelEntity implements Translation<Facet>, HasCustomFields {
	constructor(input?: DeepPartial<Translation<FacetTranslation>>) {
		super(input)
	}

	@Column('varchar') languageCode: LanguageCode

	@Column() name: string

	@Index()
	@ManyToOne(type => Facet, base => base.translations, { onDelete: 'CASCADE' })
	base: Facet

	@Column(type => CustomFacetFieldsTranslation)
	customFields: CustomFacetFieldsTranslation
}
