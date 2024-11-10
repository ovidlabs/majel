// product-review.entity.ts
import { DeepPartial } from '@majel/common/lib/shared-types'
import { MajelEntity, MajelPlugin } from '@majel/core'
import { Column, Entity } from 'typeorm'

@Entity()
export class TestEntityA extends MajelEntity {
	constructor(input?: DeepPartial<TestEntityA>) {
		super(input)
	}

	@Column()
	textA: string
}

@Entity()
export class TestEntityB extends MajelEntity {
	constructor(input?: DeepPartial<TestEntityA>) {
		super(input)
	}

	@Column()
	textB: string
}

@MajelPlugin({
	entities: () => {
		return DynamicEntitiesPlugin.useEntity === 'A' ? [TestEntityA] : [TestEntityB]
	},
})
export class DynamicEntitiesPlugin {
	static useEntity: 'A' | 'B'
	static init(options: { useEntity: 'A' | 'B' }) {
		this.useEntity = options.useEntity
		return this
	}
}
