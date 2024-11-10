import { generateMigration, revertLastMigration, runMigrations } from '@majel/core'
import program from 'commander'

import { devConfig } from './dev-config'

program
	.command('generate <name>')
	.description('Generate a new migration file with the given name')
	.action(name => {
		return generateMigration(devConfig, { name, outputDir: './migrations' })
	})

program
	.command('run')
	.description('Run all pending migrations')
	.action(() => {
		return runMigrations(devConfig)
	})

program
	.command('revert')
	.description('Revert the last applied migration')
	.action(() => {
		return revertLastMigration(devConfig)
	})

program.parse(process.argv)
