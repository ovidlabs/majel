import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { DEFAULT_CHANNEL_CODE } from '@majel/common/lib/shared-constants'

@Component({
	selector: 'vdr-channel-badge',
	templateUrl: './channel-badge.component.html',
	styleUrls: ['./channel-badge.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChannelBadgeComponent {
	@Input() channelCode: string
	get isDefaultChannel(): boolean {
		return this.channelCode === DEFAULT_CHANNEL_CODE
	}
}
