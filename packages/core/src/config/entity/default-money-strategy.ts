import { ColumnOptions } from 'typeorm'

import { Logger } from '../logger/majel-logger'

import { MoneyStrategy } from './money-strategy'

/**
 * @description
 * A {@link MoneyStrategy} that stores monetary values as a `int` type in the database.
 * The storage configuration and rounding logic replicates the behaviour of Majel pre-2.0.
 *
 * @docsCategory money
 * @since 2.0.0
 */
export class DefaultMoneyStrategy implements MoneyStrategy {
	readonly moneyColumnOptions: ColumnOptions = {
		type: 'int',
	}
	readonly precision: number = 2

	round(value: number, quantity = 1): number {
		return Math.round(value) * quantity
	}
}
