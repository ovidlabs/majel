import { DeepPartial } from '@majel/common/lib/shared-types'
import { Column, Entity } from 'typeorm'

import { MajelEntity } from '../../entity/base/base.entity'
import { JobConfig } from '../../job-queue/types'

@Entity()
export class JobRecordBuffer extends MajelEntity {
	constructor(input: DeepPartial<JobRecordBuffer>) {
		super(input)
	}

	@Column()
	bufferId: string

	@Column('simple-json')
	job: JobConfig<any>
}
