import { CollectionFragment } from '@majel/admin-ui/core'

export type RearrangeEvent = { collectionId: string; parentId: string; index: number }
export type CollectionPartial = Pick<CollectionFragment, 'id' | 'parent' | 'name'>
