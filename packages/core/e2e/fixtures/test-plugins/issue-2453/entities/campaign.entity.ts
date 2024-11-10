import type { ID, LocaleString, Translation } from '@majel/core'
import { DeepPartial, Promotion, MajelEntity } from '@majel/core'
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'

import { CampaignTranslation } from './campaign-translation.entity'

/**
 * @description This entity represents a front end campaign
 *
 * @docsCategory entities
 */
@Entity('campaign')
export class Campaign extends MajelEntity {
	constructor(input?: DeepPartial<Campaign>) {
		super(input)
	}

	@Column({ unique: true })
	code: string

	name: LocaleString

	@ManyToOne(() => Promotion, { onDelete: 'SET NULL' })
	promotion: Promotion | null

	@Column('int', { nullable: true })
	promotionId: ID | null

	@OneToMany(() => CampaignTranslation, translation => translation.base, {
		eager: true,
	})
	translations: Array<Translation<Campaign>>
}
