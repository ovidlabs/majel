import { LanguageCode } from '@majel/common/lib/generated-types'
import { ConfigModule, MajelPlugin } from '@majel/core'

@MajelPlugin({
	imports: [ConfigModule],
	configuration: config => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		config.defaultLanguageCode = LanguageCode.zh
		return config
	},
})
export class TestPluginWithConfig {
	static setup() {
		return TestPluginWithConfig
	}
}
