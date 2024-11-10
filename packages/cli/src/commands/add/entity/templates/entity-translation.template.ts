import { LanguageCode } from '@majel/common/lib/generated-types'
import { DeepPartial } from '@majel/common/lib/shared-types'
import { HasCustomFields, Translation, MajelEntity } from '@majel/core'
import { Column, Entity, Index, ManyToOne } from 'typeorm'

import { ScaffoldEntity } from './entity.template'

export class ScaffoldEntityCustomFieldsTranslation {}

@Entity()
export class ScaffoldTranslation extends MajelEntity implements Translation<ScaffoldEntity>, HasCustomFields {
	constructor(input?: DeepPartial<Translation<ScaffoldTranslation>>) {
		super(input)
	}

	@Column('varchar') languageCode: LanguageCode

	@Column() localizedName: string

	@Index()
	@ManyToOne(type => ScaffoldEntity, base => base.translations, { onDelete: 'CASCADE' })
	base: ScaffoldEntity

	@Column(type => ScaffoldEntityCustomFieldsTranslation)
	customFields: ScaffoldEntityCustomFieldsTranslation
}
