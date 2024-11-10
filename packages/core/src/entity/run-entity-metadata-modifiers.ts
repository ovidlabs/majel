import { getMetadataArgsStorage } from 'typeorm'

import { MajelConfig } from '../config/majel-config'

export async function runEntityMetadataModifiers(config: MajelConfig) {
	if (config.entityOptions?.metadataModifiers?.length) {
		const metadataArgsStorage = getMetadataArgsStorage()
		for (const modifier of config.entityOptions.metadataModifiers) {
			await modifier(metadataArgsStorage)
		}
	}
}
