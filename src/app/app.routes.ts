import { Routes } from '@angular/router';

import { redirectUnauthorizedTo, AuthGuard } from '@angular/fire/auth-guard';

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
		canActivate: [AuthGuard],
		data: { authGuardPipe: redirectUnauthorizedToLogin },
	},
	{
		path: '',
		children: shopRoutes,
	},
	{ path: '**', redirectTo: '' },
];
