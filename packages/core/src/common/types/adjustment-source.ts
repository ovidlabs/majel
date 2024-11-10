import { Adjustment, AdjustmentType } from '@majel/common/lib/generated-types'
import { ID } from '@majel/common/lib/shared-types'

import { MajelEntity } from '../../entity/base/base.entity'

export type TestResult = boolean | object

export abstract class AdjustmentSource extends MajelEntity {
	type: AdjustmentType

	getSourceId(): string {
		return `${this.type}:${this.id}`
	}

	static decodeSourceId(sourceId: string): { type: AdjustmentType; id: ID } {
		const [type, id] = sourceId.split(':')
		return {
			type: type as AdjustmentType,
			id: Number.isNaN(+id) ? id : +id,
		}
	}

	abstract test(...args: any[]): TestResult | Promise<TestResult>
	abstract apply(...args: any[]): Adjustment | undefined | Promise<Adjustment | undefined>
}
