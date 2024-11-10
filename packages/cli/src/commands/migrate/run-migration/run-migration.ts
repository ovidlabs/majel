import { log, spinner } from '@clack/prompts'
import { runMigrations } from '@majel/core'

import { CliCommand, CliCommandReturnVal } from '../../../shared/cli-command'
import { analyzeProject } from '../../../shared/shared-prompts'
import { MajelConfigRef } from '../../../shared/majel-config-ref'
import { loadMajelConfigFile } from '../load-majel-config-file'

const cancelledMessage = 'Run migrations cancelled'

export const runMigrationCommand = new CliCommand({
	id: 'run-migration',
	category: 'Other',
	description: 'Run any pending database migrations',
	run: () => runRunMigration(),
})

async function runRunMigration(): Promise<CliCommandReturnVal> {
	const { project } = await analyzeProject({ cancelledMessage })
	const majelConfig = new MajelConfigRef(project)
	log.info('Using MajelConfig from ' + majelConfig.getPathRelativeToProjectRoot())
	const config = await loadMajelConfigFile(majelConfig)

	const runSpinner = spinner()
	runSpinner.start('Running migrations...')
	const migrationsRan = await runMigrations(config)
	const report = migrationsRan.length
		? `Successfully ran ${migrationsRan.length} migrations`
		: 'No pending migrations found'
	runSpinner.stop(report)
	return {
		project,
		modifiedSourceFiles: [],
	}
}
