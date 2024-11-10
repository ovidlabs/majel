import { AdminUiConfig } from '@majel/common/lib/shared-types'

let majelUiConfig: AdminUiConfig | undefined

export async function loadAppConfig(): Promise<void> {
	majelUiConfig = await fetch('./majel-ui-config.json').then(res => res.json())
}

export function getAppConfig(): AdminUiConfig {
	if (!majelUiConfig) {
		throw new Error(`majel ui config not loaded`)
	}
	return majelUiConfig
}
