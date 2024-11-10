import type { Translation } from '@majel/core'
import { DeepPartial, LanguageCode, MajelEntity } from '@majel/core'
import { Column, Entity, Relation, ManyToOne } from 'typeorm'

import { Campaign } from './campaign.entity'

/**
 * @description This entity represents a front end campaign
 *
 * @docsCategory entities
 */
@Entity('campaign_translation')
export class CampaignTranslation extends MajelEntity implements Translation<Campaign> {
	constructor(input?: DeepPartial<Translation<Campaign>>) {
		super(input)
	}
	@Column('varchar')
	languageCode: LanguageCode

	@Column('varchar')
	name: string

	@ManyToOne(() => Campaign, base => base.translations, {
		onDelete: 'CASCADE',
	})
	base: Relation<Campaign>
}
