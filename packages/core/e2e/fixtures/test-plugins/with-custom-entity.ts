import { Collection, PluginCommonModule, MajelEntity, MajelPlugin } from '@majel/core'
import gql from 'graphql-tag'
import { DeepPartial, Entity, ManyToMany, OneToMany } from 'typeorm'

declare module '@majel/core/dist/entity/custom-entity-fields' {
	interface CustomCollectionFields {
		customEntity: TestCustomEntity
		customEntityList: TestCustomEntity[]
	}
}

@Entity()
export class TestCustomEntity extends MajelEntity {
	constructor(input?: DeepPartial<TestCustomEntity>) {
		super(input)
	}

	@ManyToMany(() => Collection, c => c.customFields?.customEntityList, {
		eager: true,
	})
	customEntityListInverse: Collection[]

	@OneToMany(() => Collection, c => c.customFields.customEntity)
	customEntityInverse: Collection[]
}

@MajelPlugin({
	imports: [PluginCommonModule],
	entities: [TestCustomEntity],
	adminApiExtensions: {
		schema: gql`
			type TestCustomEntity {
				id: ID!
			}
		`,
	},
	configuration: config => {
		config.customFields = {
			...(config.customFields ?? {}),
			Collection: [
				...(config.customFields?.Collection ?? []),
				{
					name: 'customEntity',
					type: 'relation',
					entity: TestCustomEntity,
					list: false,
					public: false,
					inverseSide: (t: TestCustomEntity) => t.customEntityInverse,
					graphQLType: 'TestCustomEntity',
				},
				{
					name: 'customEntityList',
					type: 'relation',
					entity: TestCustomEntity,
					list: true,
					public: false,
					inverseSide: (t: TestCustomEntity) => t.customEntityListInverse,
					graphQLType: 'TestCustomEntity',
				},
			],
		}
		return config
	},
})
export class WithCustomEntity {}
