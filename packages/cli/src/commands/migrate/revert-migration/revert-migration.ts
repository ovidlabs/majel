import { log, spinner } from '@clack/prompts'
import { revertLastMigration } from '@majel/core'

import { CliCommand, CliCommandReturnVal } from '../../../shared/cli-command'
import { analyzeProject } from '../../../shared/shared-prompts'
import { MajelConfigRef } from '../../../shared/majel-config-ref'
import { loadMajelConfigFile } from '../load-majel-config-file'

const cancelledMessage = 'Revert migrations cancelled'

export const revertMigrationCommand = new CliCommand({
	id: 'run-migration',
	category: 'Other',
	description: 'Run any pending database migrations',
	run: () => runRevertMigration(),
})

async function runRevertMigration(): Promise<CliCommandReturnVal> {
	const { project } = await analyzeProject({ cancelledMessage })
	const majelConfig = new MajelConfigRef(project)
	log.info('Using MajelConfig from ' + majelConfig.getPathRelativeToProjectRoot())
	const config = await loadMajelConfigFile(majelConfig)

	const runSpinner = spinner()
	runSpinner.start('Reverting last migration...')
	await revertLastMigration(config)
	runSpinner.stop(`Successfully reverted last migration`)
	return {
		project,
		modifiedSourceFiles: [],
	}
}
