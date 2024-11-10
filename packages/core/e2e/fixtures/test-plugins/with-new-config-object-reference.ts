import { Query, Resolver } from '@nestjs/graphql'
import { MajelPlugin } from '@majel/core'

/**
 * https://github.com/majel-ecommerce/majel/issues/2906
 */
@MajelPlugin({
	configuration: config => {
		return {
			...config,
			customFields: {
				...config.customFields,
				Customer: [
					{
						name: 'testField',
						type: 'string',
					},
				],
			},
		}
	},
})
export class WithNewConfigObjectReferencePlugin {}
