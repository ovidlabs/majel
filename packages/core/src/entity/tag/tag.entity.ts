import { DeepPartial } from '@majel/common/lib/shared-types'
import { Column, Entity } from 'typeorm'

import { MajelEntity } from '../base/base.entity'

/**
 * @description
 * A tag is an arbitrary label which can be applied to certain entities.
 * It is used to help organize and filter those entities.
 *
 * @docsCategory entities
 */
@Entity()
export class Tag extends MajelEntity {
	constructor(input?: DeepPartial<Tag>) {
		super(input)
	}

	@Column()
	value: string
}
