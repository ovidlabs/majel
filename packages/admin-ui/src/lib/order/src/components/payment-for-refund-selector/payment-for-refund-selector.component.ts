import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { OrderDetailFragment } from '@majel/admin-ui/core'
import { RefundablePayment } from '../../common/get-refundable-payments'

@Component({
	selector: 'vdr-payment-for-refund-selector',
	templateUrl: './payment-for-refund-selector.component.html',
	styleUrls: ['./payment-for-refund-selector.component.scss'],
	changeDetection: ChangeDetectionStrategy.Default,
})
export class PaymentForRefundSelectorComponent {
	@Input() refundablePayments: RefundablePayment[]
	@Input() order: OrderDetailFragment
	@Output() paymentSelected = new EventEmitter<{ payment: RefundablePayment; selected: boolean }>()
}
