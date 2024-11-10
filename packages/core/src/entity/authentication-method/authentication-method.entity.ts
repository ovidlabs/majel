import { Entity, Index, ManyToOne, TableInheritance } from 'typeorm'

import { MajelEntity } from '../base/base.entity'
import { User } from '../user/user.entity'

/**
 * @description
 * An AuthenticationMethod represents the means by which a {@link User} is authenticated. There are two kinds:
 * {@link NativeAuthenticationMethod} and {@link ExternalAuthenticationMethod}.
 *
 * @docsCategory entities
 * @docsPage AuthenticationMethod
 */
@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class AuthenticationMethod extends MajelEntity {
	@Index()
	@ManyToOne(type => User, user => user.authenticationMethods)
	user: User
}
