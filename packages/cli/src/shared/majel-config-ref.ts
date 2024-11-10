import fs from 'fs-extra'
import path from 'node:path'
import { Node, ObjectLiteralExpression, Project, SourceFile, SyntaxKind, VariableDeclaration } from 'ts-morph'

export class MajelConfigRef {
	readonly sourceFile: SourceFile
	readonly configObject: ObjectLiteralExpression

	constructor(
		private project: Project,
		options: { checkFileName?: boolean } = {},
	) {
		const checkFileName = options.checkFileName ?? true

		const getMajelConfigSourceFile = (sourceFiles: SourceFile[]) => {
			return sourceFiles.find(sf => {
				return (
					(checkFileName ? sf.getFilePath().endsWith('majel-config.ts') : true) &&
					sf.getVariableDeclarations().find(v => this.isMajelConfigVariableDeclaration(v))
				)
			})
		}

		const findAndAddMajelConfigToProject = () => {
			// If the project does not contain a majel-config.ts file, we'll look for a majel-config.ts file
			// in the src directory.
			const srcDir = project.getDirectory('src')
			if (srcDir) {
				const srcDirPath = srcDir.getPath()
				const srcFiles = fs.readdirSync(srcDirPath)

				const filePath = srcFiles.find(file => file.includes('majel-config.ts'))
				if (filePath) {
					project.addSourceFileAtPath(path.join(srcDirPath, filePath))
				}
			}
		}

		let majelConfigFile = getMajelConfigSourceFile(project.getSourceFiles())
		if (!majelConfigFile) {
			findAndAddMajelConfigToProject()
			majelConfigFile = getMajelConfigSourceFile(project.getSourceFiles())
		}
		if (!majelConfigFile) {
			throw new Error('Could not find the MajelConfig declaration in your project.')
		}
		this.sourceFile = majelConfigFile
		this.configObject = majelConfigFile
			?.getVariableDeclarations()
			.find(v => this.isMajelConfigVariableDeclaration(v))
			?.getChildren()
			.find(Node.isObjectLiteralExpression) as ObjectLiteralExpression
	}

	getPathRelativeToProjectRoot() {
		return path.relative(
			this.project.getRootDirectories()[0]?.getPath() ?? '',
			this.sourceFile.getFilePath(),
		)
	}

	getConfigObjectVariableName() {
		return this.sourceFile
			?.getVariableDeclarations()
			.find(v => this.isMajelConfigVariableDeclaration(v))
			?.getName()
	}

	getPluginsArray() {
		return this.configObject.getProperty('plugins')?.getFirstChildByKind(SyntaxKind.ArrayLiteralExpression)
	}

	addToPluginsArray(text: string) {
		this.getPluginsArray()?.addElement(text).formatText()
	}

	private isMajelConfigVariableDeclaration(v: VariableDeclaration) {
		return v.getType().getText(v) === 'MajelConfig'
	}
}
