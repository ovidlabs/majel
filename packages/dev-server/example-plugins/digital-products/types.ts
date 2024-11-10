import {
	CustomProductVariantFields,
	CustomFulfillmentFields,
	CustomShippingMethodFields,
} from '@majel/core/dist/entity/custom-entity-fields'

declare module '@majel/core/dist/entity/custom-entity-fields' {
	interface CustomProductVariantFields {
		isDigital: boolean
	}
	interface CustomShippingMethodFields {
		isDigital: boolean
	}
	interface CustomFulfillmentFields {
		downloadUrls: string[] | null
	}
}
