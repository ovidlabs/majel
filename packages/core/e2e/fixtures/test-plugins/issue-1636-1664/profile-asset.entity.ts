import { DeepPartial } from '@majel/common/lib/shared-types'
import { Asset, MajelEntity } from '@majel/core'
import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm'

import { Profile } from './profile.entity'

@Entity()
export class ProfileAsset extends MajelEntity {
	constructor(input?: DeepPartial<ProfileAsset>) {
		super(input)
	}

	@OneToOne(() => Asset, { eager: true, onDelete: 'CASCADE' })
	@JoinColumn()
	asset: Asset

	@ManyToOne(() => Profile, { onDelete: 'CASCADE' })
	profile: Profile
}
