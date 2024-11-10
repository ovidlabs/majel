import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
	selector: 'vdr-labeled-data',
	templateUrl: './labeled-data.component.html',
	styleUrls: ['./labeled-data.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabeledDataComponent {
	@Input() label: string
}
