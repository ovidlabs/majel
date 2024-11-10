import { LanguageCode } from '@majel/common/lib/generated-types'
import { DeepPartial } from '@majel/common/lib/shared-types'
import { Column, Entity, Index, ManyToOne } from 'typeorm'

import { Translation } from '../../common/types/locale-types'
import { HasCustomFields } from '../../config/custom-field/custom-field-types'
import { MajelEntity } from '../base/base.entity'
import { CustomRegionFieldsTranslation } from '../custom-entity-fields'

import { Region } from './region.entity'

@Entity()
export class RegionTranslation extends MajelEntity implements Translation<Region>, HasCustomFields {
	constructor(input?: DeepPartial<Translation<RegionTranslation>>) {
		super(input)
	}

	@Column('varchar') languageCode: LanguageCode

	@Column() name: string

	@Index()
	@ManyToOne(type => Region, base => base.translations, { onDelete: 'CASCADE' })
	base: Region

	@Column(type => CustomRegionFieldsTranslation)
	customFields: CustomRegionFieldsTranslation
}
