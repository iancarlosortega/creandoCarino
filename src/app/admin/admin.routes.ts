import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';

export const adminRoutes: Routes = [
	{
		path: '',
		component: DashboardLayoutComponent,
		children: [
			{
				path: 'dashboard',
				loadComponent: () => import('./pages/home/home.component'),
			},
			{
				path: '**',
				redirectTo: 'dashboard',
			},
		],
	},
];
