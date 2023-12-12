import { Routes } from '@angular/router';

import {
	AngularFireAuthGuard,
	redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';

import { authRoutes } from './auth/auth.routes';
import { adminRoutes } from './admin/admin.routes';
import { shopRoutes } from './shop/shop.routes';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/']);

export const routes: Routes = [
	{
		path: 'auth',
		children: authRoutes,
	},
	{
		path: 'admin',
		children: adminRoutes,
		canActivate: [AngularFireAuthGuard],
		data: { authGuardPipe: redirectUnauthorizedToLogin },
	},
	{
		path: '',
		children: shopRoutes,
	},
	{ path: '**', redirectTo: '' },
];
