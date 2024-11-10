import { ClassDeclaration } from 'ts-morph'

import { MajelPluginRef } from '../../../../../shared/majel-plugin-ref'
import { addImportsToFile } from '../../../../../utilities/ast-utils'

export function addEntityToPlugin(plugin: MajelPluginRef, entityClass: ClassDeclaration) {
	if (!entityClass) {
		throw new Error('Could not find entity class')
	}
	const entityClassName = entityClass.getName() as string
	plugin.addEntity(entityClassName)

	addImportsToFile(plugin.classDeclaration.getSourceFile(), {
		moduleSpecifier: entityClass.getSourceFile(),
		namedImports: [entityClassName],
	})
}
