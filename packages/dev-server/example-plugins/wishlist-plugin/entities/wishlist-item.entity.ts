import { DeepPartial, ID, ProductVariant, MajelEntity } from '@majel/core'
import { Column, Entity, ManyToOne } from 'typeorm'

@Entity()
export class WishlistItem extends MajelEntity {
	constructor(input?: DeepPartial<WishlistItem>) {
		super(input)
	}

	@ManyToOne(type => ProductVariant)
	productVariant: ProductVariant

	@Column()
	productVariantId: ID
}
