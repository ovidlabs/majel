import { cancel, log, note, outro, spinner } from '@clack/prompts'
import path from 'path'
import { StructureKind } from 'ts-morph'

import { CliCommand, CliCommandReturnVal } from '../../../shared/cli-command'
import { PackageJson } from '../../../shared/package-json-ref'
import { analyzeProject, selectMultiplePluginClasses } from '../../../shared/shared-prompts'
import { MajelPluginRef } from '../../../shared/majel-plugin-ref'
import { getRelativeImportPath } from '../../../utilities/ast-utils'
import { pauseForPromptDisplay } from '../../../utilities/utils'

import { CodegenConfigRef } from './codegen-config-ref'

export interface AddCodegenOptions {
	plugin?: MajelPluginRef
}

export const addCodegenCommand = new CliCommand({
	id: 'add-codegen',
	category: 'Project: Codegen',
	description: 'Set up GraphQL code generation',
	run: addCodegen,
})

async function addCodegen(options?: AddCodegenOptions): Promise<CliCommandReturnVal> {
	const providedMajelPlugin = options?.plugin
	const { project } = await analyzeProject({
		providedMajelPlugin,
		cancelledMessage: 'Add codegen cancelled',
	})
	const plugins = providedMajelPlugin
		? [providedMajelPlugin]
		: await selectMultiplePluginClasses(project, 'Add codegen cancelled')

	const packageJson = new PackageJson(project)
	const installSpinner = spinner()
	installSpinner.start(`Installing dependencies...`)
	const packagesToInstall = [
		{
			pkg: '@graphql-codegen/cli',
			isDevDependency: true,
		},
		{
			pkg: '@graphql-codegen/typescript',
			isDevDependency: true,
		},
	]
	if (plugins.some(p => p.hasUiExtensions())) {
		packagesToInstall.push({
			pkg: '@graphql-codegen/client-preset',
			isDevDependency: true,
		})
	}
	const packageManager = packageJson.determinePackageManager()
	const packageJsonFile = packageJson.locatePackageJsonWithMajelDependency()
	log.info(`Detected package manager: ${packageManager}`)
	if (!packageJsonFile) {
		cancel(`Could not locate package.json file with a dependency on Majel.`)
		process.exit(1)
	}
	log.info(`Detected package.json: ${packageJsonFile}`)
	try {
		await packageJson.installPackages(packagesToInstall)
	} catch (e: any) {
		log.error(`Failed to install dependencies: ${e.message as string}.`)
	}
	installSpinner.stop('Dependencies installed')

	const configSpinner = spinner()
	configSpinner.start('Configuring codegen file...')
	await pauseForPromptDisplay()

	const codegenFile = new CodegenConfigRef(project, packageJson.getPackageRootDir())

	const rootDir = project.getDirectory('.')
	if (!rootDir) {
		throw new Error('Could not find the root directory of the project')
	}
	for (const plugin of plugins) {
		const relativePluginPath = getRelativeImportPath({
			from: rootDir,
			to: plugin.classDeclaration.getSourceFile(),
		})
		const generatedTypesPath = `${path.dirname(relativePluginPath)}/gql/generated.ts`
		codegenFile.addEntryToGeneratesObject({
			name: `'${generatedTypesPath}'`,
			kind: StructureKind.PropertyAssignment,
			initializer: `{ plugins: ['typescript'] }`,
		})

		if (plugin.hasUiExtensions()) {
			const uiExtensionsPath = `${path.dirname(relativePluginPath)}/ui`
			codegenFile.addEntryToGeneratesObject({
				name: `'${uiExtensionsPath}/gql/'`,
				kind: StructureKind.PropertyAssignment,
				initializer: `{
                        preset: 'client',
                        documents: '${uiExtensionsPath}/**/*.ts',
                        presetConfig: {
                            fragmentMasking: false,
                        },
                     }`,
			})
		}
	}

	packageJson.addScript('codegen', 'graphql-codegen --config codegen.ts')

	configSpinner.stop('Configured codegen file')

	await project.save()

	const nextSteps = [
		`You can run codegen by doing the following:`,
		`1. Ensure your dev server is running`,
		`2. Run "npm run codegen"`,
	]
	note(nextSteps.join('\n'))

	return {
		project,
		modifiedSourceFiles: [codegenFile.sourceFile],
	}
}
