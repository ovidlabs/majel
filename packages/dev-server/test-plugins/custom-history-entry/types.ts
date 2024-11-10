import { CustomerHistoryEntryData } from '@majel/core'

export const CUSTOM_TYPE = 'CUSTOM_TYPE'

declare module '@majel/core' {
	interface OrderHistoryEntryData {
		[CUSTOM_TYPE]: { message: string }
	}

	interface CustomerHistoryEntryData {
		[CUSTOM_TYPE]: { name: string }
	}
}
