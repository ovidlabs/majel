import { RequestContext } from '../api'

import { MajelEvent } from './majel-event'

/**
 * @description
 * The base class for all entity events used by the EventBus system.
 * * For event type `'deleted'` the input will most likely be an `id: ID`
 *
 * @docsCategory events
 * */
export abstract class MajelEntityEvent<Entity, Input = any> extends MajelEvent {
	public readonly entity: Entity
	public readonly type: 'created' | 'updated' | 'deleted'
	public readonly ctx: RequestContext
	public readonly input?: Input

	protected constructor(
		entity: Entity,
		type: 'created' | 'updated' | 'deleted',
		ctx: RequestContext,
		input?: Input,
	) {
		super()
		this.entity = entity
		this.type = type
		this.ctx = ctx
		this.input = input
	}
}
