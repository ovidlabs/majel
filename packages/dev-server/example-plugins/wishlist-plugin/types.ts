import { CustomCustomerFields } from '@majel/core/dist/entity/custom-entity-fields'

import { WishlistItem } from './entities/wishlist-item.entity'

declare module '@majel/core/dist/entity/custom-entity-fields' {
	interface CustomCustomerFields {
		wishlistItems: WishlistItem[]
	}
}
