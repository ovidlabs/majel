import { Route } from '@angular/router'
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker'
import { AppShellComponent, AuthGuard } from '@majel/admin-ui/core'

export const routes: Route[] = [
	{ path: 'login', loadChildren: () => import('@majel/admin-ui/login').then(m => m.LoginModule) },
	{
		path: '',
		canActivate: [AuthGuard],
		component: AppShellComponent,
		data: {
			breadcrumb: _('breadcrumb.dashboard'),
		},
		children: [
			{
				path: '',
				pathMatch: 'full',
				loadChildren: () => import('@majel/admin-ui/dashboard').then(m => m.DashboardModule),
			},
			{
				path: 'catalog',
				loadChildren: () => import('@majel/admin-ui/catalog').then(m => m.CatalogModule),
			},
			{
				path: 'customer',
				loadChildren: () => import('@majel/admin-ui/customer').then(m => m.CustomerModule),
			},
			{
				path: 'orders',
				loadChildren: () => import('@majel/admin-ui/order').then(m => m.OrderModule),
			},
			{
				path: 'marketing',
				loadChildren: () => import('@majel/admin-ui/marketing').then(m => m.MarketingModule),
			},
			{
				path: 'settings',
				loadChildren: () => import('@majel/admin-ui/settings').then(m => m.SettingsModule),
			},
			{
				path: 'system',
				loadChildren: () => import('@majel/admin-ui/system').then(m => m.SystemModule),
			},
		],
	},
]
