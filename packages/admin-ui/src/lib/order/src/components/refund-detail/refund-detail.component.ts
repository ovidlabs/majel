import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { CurrencyCode, OrderDetailFragment } from '@majel/admin-ui/core'

@Component({
	selector: 'vdr-refund-detail',
	templateUrl: './refund-detail.component.html',
	styleUrls: ['./refund-detail.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefundDetailComponent {
	@Input() refund: NonNullable<OrderDetailFragment['payments']>[number]['refunds'][number]
	@Input() currencyCode: CurrencyCode
}
