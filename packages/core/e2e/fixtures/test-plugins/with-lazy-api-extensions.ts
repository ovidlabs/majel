import { Query, Resolver } from '@nestjs/graphql'
import { MajelPlugin } from '@majel/core'
import gql from 'graphql-tag'

@Resolver()
export class TestLazyResolver {
	@Query()
	lazy() {
		return 'sleeping'
	}
}

@MajelPlugin({
	shopApiExtensions: {
		resolvers: () => [TestLazyResolver],
		schema: () => gql`
			extend type Query {
				lazy: String!
			}
		`,
	},
})
export class TestLazyExtensionPlugin {}
