/* eslint-disable no-console */
import { AdminUiPlugin } from '@majel/admin-ui-plugin'
import { AssetServerPlugin } from '@majel/asset-server-plugin'
import { ADMIN_API_PATH, API_PORT, SHOP_API_PATH } from '@majel/common/lib/shared-constants'
import {
	Asset,
	DefaultJobQueuePlugin,
	DefaultLogger,
	DefaultSearchPlugin,
	dummyPaymentHandler,
	LanguageCode,
	LogLevel,
	MajelConfig,
} from '@majel/core'
import { ElasticsearchPlugin } from '@majel/elasticsearch-plugin'
import { defaultEmailHandlers, EmailPlugin } from '@majel/email-plugin'
import { BullMQJobQueuePlugin } from '@majel/job-queue-plugin/package/bullmq'
import 'dotenv/config'
import { compileUiExtensions } from '@majel/ui-devkit/compiler'
import path from 'path'
import { DataSourceOptions } from 'typeorm'

import { MultivendorPlugin } from './example-plugins/multivendor-plugin/multivendor.plugin'

/**
 * Config settings used during development
 */
export const devConfig: MajelConfig = {
	apiOptions: {
		port: API_PORT,
		adminApiPath: ADMIN_API_PATH,
		adminApiPlayground: {
			settings: {
				'request.credentials': 'include',
			},
		},
		adminApiDebug: true,
		shopApiPath: SHOP_API_PATH,
		shopApiPlayground: {
			settings: {
				'request.credentials': 'include',
			},
		},
		shopApiDebug: true,
	},
	authOptions: {
		disableAuth: false,
		tokenMethod: ['bearer', 'cookie'] as const,
		requireVerification: true,
		customPermissions: [],
		cookieOptions: {
			secret: 'abc',
		},
	},
	dbConnectionOptions: {
		synchronize: false,
		logging: false,
		migrations: [path.join(__dirname, 'migrations/*.ts')],
		type: 'postgres',
		host: process.env.DB_HOST || 'localhost',
		port: Number(process.env.DB_PORT) || 5432,
		username: process.env.DB_USERNAME || 'postgres',
		password: process.env.DB_PASSWORD || 'postgres',
		database: process.env.DB_NAME || 'majel',
		schema: process.env.DB_SCHEMA || 'public',
	},
	paymentOptions: {
		paymentMethodHandlers: [dummyPaymentHandler],
	},

	customFields: {},
	logger: new DefaultLogger({ level: LogLevel.Verbose }),
	importExportOptions: {
		importAssetsDir: path.join(__dirname, 'import-assets'),
	},
	plugins: [
		// MultivendorPlugin.init({
		//     platformFeePercent: 10,
		//     platformFeeSKU: 'FEE',
		// }),
		AssetServerPlugin.init({
			route: 'assets',
			assetUploadDir: path.join(__dirname, 'assets'),
		}),
		DefaultSearchPlugin.init({ bufferUpdates: false, indexStockStatus: false }),
		// Enable if you need to debug the job queue
		// BullMQJobQueuePlugin.init({}),
		DefaultJobQueuePlugin.init({}),
		// JobQueueTestPlugin.init({ queueCount: 10 }),
		// ElasticsearchPlugin.init({
		//     host: 'http://localhost',
		//     port: 9200,
		//     bufferUpdates: true,
		// }),
		EmailPlugin.init({
			devMode: true,
			route: 'mailbox',
			handlers: defaultEmailHandlers,
			templatePath: path.join(__dirname, '../email-plugin/templates'),
			outputPath: path.join(__dirname, 'test-emails'),
			globalTemplateVars: {
				verifyEmailAddressUrl: 'http://localhost:4201/verify',
				passwordResetUrl: 'http://localhost:4201/reset-password',
				changeEmailAddressUrl: 'http://localhost:4201/change-email-address',
			},
		}),
		AdminUiPlugin.init({
			route: 'admin',
			port: 5001,
			// Un-comment to compile a custom admin ui
			// app: compileUiExtensions({
			//     outputPath: path.join(__dirname, './custom-admin-ui'),
			//     extensions: [
			//         {
			//             id: 'ui-extensions-library',
			//             extensionPath: path.join(__dirname, 'example-plugins/ui-extensions-library/ui'),
			//             routes: [{ route: 'ui-library', filePath: 'routes.ts' }],
			//             providers: ['providers.ts'],
			//         },
			//         {
			//             globalStyles: path.join(
			//                 __dirname,
			//                 'test-plugins/with-ui-extension/ui/custom-theme.scss',
			//             ),
			//         },
			//     ],
			//     devMode: true,
			// }),
		}),
	],
}
