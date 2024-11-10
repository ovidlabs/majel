import { PluginCommonModule, MajelPlugin } from '@majel/core'

import { apiExtensions } from './api/index'
import { CampaignTranslation } from './entities/campaign-translation.entity'
import { Campaign } from './entities/campaign.entity'
import { collectionCustomFields } from './entities/custom-fields-collection.entity'
import { CampaignService } from './services/campaign.service'

@MajelPlugin({
	imports: [PluginCommonModule],
	entities: [Campaign, CampaignTranslation],
	adminApiExtensions: {
		schema: apiExtensions,
	},
	shopApiExtensions: {
		schema: apiExtensions,
	},
	compatibility: '>=2.0.0',
	providers: [CampaignService],
	configuration: config => {
		config.customFields.Collection.push(...collectionCustomFields)
		return config
	},
})
export class PluginIssue2453 {
	constructor(private campaignService: CampaignService) {}
	async onApplicationBootstrap() {
		await this.campaignService.initCampaigns()
	}
}
