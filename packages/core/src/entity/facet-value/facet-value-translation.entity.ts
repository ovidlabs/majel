import { LanguageCode } from '@majel/common/lib/generated-types'
import { DeepPartial } from '@majel/common/lib/shared-types'
import { Column, Entity, Index, ManyToOne } from 'typeorm'

import { Translation } from '../../common/types/locale-types'
import { MajelEntity } from '../base/base.entity'
import { CustomFacetValueFieldsTranslation } from '../custom-entity-fields'

import { FacetValue } from './facet-value.entity'

@Entity()
export class FacetValueTranslation extends MajelEntity implements Translation<FacetValue> {
	constructor(input?: DeepPartial<Translation<FacetValue>>) {
		super(input)
	}

	@Column('varchar') languageCode: LanguageCode

	@Column() name: string

	@Index()
	@ManyToOne(type => FacetValue, base => base.translations, { onDelete: 'CASCADE' })
	base: FacetValue

	@Column(type => CustomFacetValueFieldsTranslation)
	customFields: CustomFacetValueFieldsTranslation
}
