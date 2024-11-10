import { cancel, log, note, outro, spinner } from '@clack/prompts'
import fs from 'fs-extra'
import path from 'path'

import { CliCommand, CliCommandReturnVal } from '../../../shared/cli-command'
import { PackageJson } from '../../../shared/package-json-ref'
import { analyzeProject, selectPlugin } from '../../../shared/shared-prompts'
import { MajelConfigRef } from '../../../shared/majel-config-ref'
import { MajelPluginRef } from '../../../shared/majel-plugin-ref'
import { createFile, getRelativeImportPath } from '../../../utilities/ast-utils'

import { addUiExtensionStaticProp } from './codemods/add-ui-extension-static-prop/add-ui-extension-static-prop'
import { updateAdminUiPluginInit } from './codemods/update-admin-ui-plugin-init/update-admin-ui-plugin-init'

export interface AddUiExtensionsOptions {
	plugin?: MajelPluginRef
}

export const addUiExtensionsCommand = new CliCommand<AddUiExtensionsOptions>({
	id: 'add-ui-extensions',
	category: 'Plugin: UI',
	description: 'Set up Admin UI extensions',
	run: options => addUiExtensions(options),
})

async function addUiExtensions(options?: AddUiExtensionsOptions): Promise<CliCommandReturnVal> {
	const providedMajelPlugin = options?.plugin
	const { project } = await analyzeProject({ providedMajelPlugin })
	const majelPlugin = providedMajelPlugin ?? (await selectPlugin(project, 'Add UI extensions cancelled'))
	const packageJson = new PackageJson(project)

	if (majelPlugin.hasUiExtensions()) {
		outro('This plugin already has UI extensions configured')
		return { project, modifiedSourceFiles: [] }
	}
	addUiExtensionStaticProp(majelPlugin)

	log.success('Updated the plugin class')
	const installSpinner = spinner()
	const packageManager = packageJson.determinePackageManager()
	const packageJsonFile = packageJson.locatePackageJsonWithMajelDependency()
	log.info(`Detected package manager: ${packageManager}`)
	if (!packageJsonFile) {
		cancel(`Could not locate package.json file with a dependency on Majel.`)
		process.exit(1)
	}
	log.info(`Detected package.json: ${packageJsonFile}`)
	installSpinner.start(`Installing dependencies using ${packageManager}...`)
	try {
		const version = packageJson.determineMajelVersion()
		await packageJson.installPackages([
			{
				pkg: '@majel/ui-devkit',
				isDevDependency: true,
				version,
			},
			{
				pkg: '@types/react',
				isDevDependency: true,
			},
		])
	} catch (e: any) {
		log.error(`Failed to install dependencies: ${e.message as string}.`)
	}
	installSpinner.stop('Dependencies installed')

	const pluginDir = majelPlugin.getPluginDir().getPath()

	const providersFileDest = path.join(pluginDir, 'ui', 'providers.ts')
	if (!fs.existsSync(providersFileDest)) {
		createFile(project, path.join(__dirname, 'templates/providers.template.ts'), providersFileDest)
	}
	const routesFileDest = path.join(pluginDir, 'ui', 'routes.ts')
	if (!fs.existsSync(routesFileDest)) {
		createFile(project, path.join(__dirname, 'templates/routes.template.ts'), routesFileDest)
	}

	log.success('Created UI extension scaffold')

	const majelConfig = new MajelConfigRef(project)
	if (!majelConfig) {
		log.warning(
			`Could not find the MajelConfig declaration in your project. You will need to manually set up the compileUiExtensions function.`,
		)
	} else {
		const pluginClassName = majelPlugin.name
		const pluginPath = getRelativeImportPath({
			to: majelPlugin.classDeclaration.getSourceFile(),
			from: majelConfig.sourceFile,
		})
		const updated = updateAdminUiPluginInit(majelConfig, { pluginClassName, pluginPath })
		if (updated) {
			log.success('Updated MajelConfig file')
		} else {
			log.warning(`Could not update \`AdminUiPlugin.init()\` options.`)
			note(
				`You will need to manually set up the compileUiExtensions function,\nadding ` +
					`the \`${pluginClassName}.ui\` object to the \`extensions\` array.`,
				'Info',
			)
		}
	}

	await project.save()
	return { project, modifiedSourceFiles: [majelPlugin.classDeclaration.getSourceFile()] }
}
