import { Injectable } from '@nestjs/common'
import { TransactionalConnection } from '@majel/core'

@Injectable()
export class ErrorTestService {
	constructor(private connection: TransactionalConnection) {}

	createDatabaseError() {
		return this.connection.rawConnection.query('SELECT * FROM non_existent_table')
	}
}
