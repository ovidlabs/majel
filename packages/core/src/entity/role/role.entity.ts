import { Permission } from '@majel/common/lib/generated-types'
import { DeepPartial } from '@majel/common/lib/shared-types'
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'

import { ChannelAware } from '../../common/types/common-types'
import { MajelEntity } from '../base/base.entity'
import { Channel } from '../channel/channel.entity'

/**
 * @description
 * A Role represents a collection of permissions which determine the authorization
 * level of a {@link User} on a given set of {@link Channel}s.
 *
 * @docsCategory entities
 */
@Entity()
export class Role extends MajelEntity implements ChannelAware {
	constructor(input?: DeepPartial<Role>) {
		super(input)
	}

	@Column() code: string

	@Column() description: string

	@Column('simple-array') permissions: Permission[]

	@ManyToMany(type => Channel, channel => channel.roles)
	@JoinTable()
	channels: Channel[]
}
