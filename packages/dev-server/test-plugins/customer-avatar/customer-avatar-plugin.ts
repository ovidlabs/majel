import { Asset, PluginCommonModule, MajelPlugin } from '@majel/core'

import { shopApiExtensions } from './api-extensions'
import { CustomerAvatarResolver } from './customer-avatar.resolver'

@MajelPlugin({
	imports: [PluginCommonModule],
	shopApiExtensions: {
		schema: shopApiExtensions,
		resolvers: [CustomerAvatarResolver],
	},
	configuration: config => {
		config.customFields.Customer.push({
			name: 'avatar',
			type: 'relation',
			entity: Asset,
			nullable: true,
		})
		return config
	},
})
export class CustomerAvatarPlugin {}
