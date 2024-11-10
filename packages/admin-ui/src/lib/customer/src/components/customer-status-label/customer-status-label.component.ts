import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { CustomerFragment } from '@majel/admin-ui/core'

@Component({
	selector: 'vdr-customer-status-label',
	templateUrl: './customer-status-label.component.html',
	styleUrls: ['./customer-status-label.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerStatusLabelComponent {
	@Input() customer: CustomerFragment
}
