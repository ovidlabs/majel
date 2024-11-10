import { DeepPartial } from '@majel/common/lib/shared-types'
import { User, MajelEntity } from '@majel/core'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm'

import { ProfileAsset } from './profile-asset.entity'

@Entity()
export class Profile extends MajelEntity {
	constructor(input?: DeepPartial<Profile>) {
		super(input)
	}
	/**
	 * The reference to a user
	 */
	@ManyToOne(() => User, user => (user as any).profileId, { onDelete: 'CASCADE' })
	user: User
	/**
	 * Profile display name
	 */
	@Column()
	name: string
	/**
	 * The profile picture
	 */
	@OneToOne(() => ProfileAsset, profileAsset => profileAsset.profile, {
		onDelete: 'SET NULL',
		nullable: true,
	})
	@JoinColumn()
	featuredAsset: ProfileAsset

	/**
	 * Other assets
	 */
	@OneToMany(() => ProfileAsset, profileAsset => profileAsset.profile, {
		onDelete: 'CASCADE',
	})
	assets: ProfileAsset[]
}
