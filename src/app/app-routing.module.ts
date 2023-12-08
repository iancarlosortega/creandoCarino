import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
	AngularFireAuthGuard,
	redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/']);

const routes: Routes = [
	{
		path: 'auth',
		loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
	},
	{
		path: 'admin',
		loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
		canActivate: [AngularFireAuthGuard],
		data: { authGuardPipe: redirectUnauthorizedToLogin },
	},
	{
		path: '',
		loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule),
	},
	{ path: '**', redirectTo: '' },
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
