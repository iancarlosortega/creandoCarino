import { Routes } from '@angular/router';
import { ShopLayoutComponent } from './layouts/shop-layout/shop-layout.component';

export const shopRoutes: Routes = [
	{
		path: '',
		component: ShopLayoutComponent,
		children: [
			{
				path: '',
				loadComponent: () => import('./pages/home/home.component'),
			},
			{
				path: ':name/:id',
				loadComponent: () => import('./pages/categories/categories.component'),
			},
			{
				path: 'producto/:category/:id',
				loadComponent: () => import('./pages/product/product.component'),
			},
			{
				path: 'pago',
				loadComponent: () => import('./pages/payment/payment.component'),
			},
			{
				path: 'guia',
				loadComponent: () => import('./pages/guide/guide.component'),
			},
		],
	},
];
