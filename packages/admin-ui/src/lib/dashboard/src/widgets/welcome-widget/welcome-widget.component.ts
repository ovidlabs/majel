import { ChangeDetectionStrategy, Component, NgModule, OnInit } from '@angular/core'
import {
	ADMIN_UI_VERSION,
	CoreModule,
	DataService,
	GetActiveAdministratorQuery,
	getAppConfig,
} from '@majel/admin-ui/core'
import { Observable } from 'rxjs'

@Component({
	selector: 'vdr-welcome-widget',
	templateUrl: './welcome-widget.component.html',
	styleUrls: ['./welcome-widget.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeWidgetComponent implements OnInit {
	version = ADMIN_UI_VERSION
	administrator$: Observable<GetActiveAdministratorQuery['activeAdministrator']>
	brand = getAppConfig().brand
	hideMajelBranding = getAppConfig().hideMajelBranding
	hideVersion = getAppConfig().hideVersion

	constructor(private dataService: DataService) {}

	ngOnInit(): void {
		this.administrator$ = this.dataService.administrator
			.getActiveAdministrator()
			.mapStream(data => data.activeAdministrator || null)
	}
}

@NgModule({
	imports: [CoreModule],
	declarations: [WelcomeWidgetComponent],
})
export class WelcomeWidgetModule {}
