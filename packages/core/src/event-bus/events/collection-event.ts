import { CreateCollectionInput, UpdateCollectionInput } from '@majel/common/lib/generated-types'
import { ID } from '@majel/common/lib/shared-types'

import { RequestContext } from '../../api'
import { Collection } from '../../entity'
import { MajelEntityEvent } from '../majel-entity-event'

type CollectionInputTypes = CreateCollectionInput | UpdateCollectionInput | ID

/**
 * @description
 * This event is fired whenever a {@link Collection} is added, updated or deleted.
 *
 * @docsCategory events
 * @docsPage Event Types
 * @since 1.4
 */
export class CollectionEvent extends MajelEntityEvent<Collection, CollectionInputTypes> {
	constructor(
		ctx: RequestContext,
		entity: Collection,
		type: 'created' | 'updated' | 'deleted',
		input?: CollectionInputTypes,
	) {
		super(entity, type, ctx, input)
	}
}
