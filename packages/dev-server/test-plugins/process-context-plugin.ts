import { OnApplicationBootstrap, OnModuleInit } from '@nestjs/common'
import { Logger, PluginCommonModule, ProcessContext, MajelPlugin } from '@majel/core'

/**
 * Testing whether the ProcessContext service is giving the correct results.
 */
@MajelPlugin({
	imports: [PluginCommonModule],
})
export class ProcessContextPlugin implements OnApplicationBootstrap, OnModuleInit {
	constructor(private processContext: ProcessContext) {}

	onApplicationBootstrap(): any {
		Logger.warn(`onApplicationBootstrap: isServer: ${this.processContext.isServer}`)
	}

	onModuleInit(): any {
		Logger.warn(`onModuleInit: isServer: ${this.processContext.isServer}`)
	}
}
