import { Routes } from '@angular/router';

export const authRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'login',
				loadComponent: () => import('./pages/login/login.component'),
			},
			{
				path: '**',
				redirectTo: 'login',
			},
		],
	},
];
