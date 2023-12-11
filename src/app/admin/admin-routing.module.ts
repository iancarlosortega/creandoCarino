import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';

const routes: Routes = [
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

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminRoutingModule {}
