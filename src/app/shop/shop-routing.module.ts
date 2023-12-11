import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShopLayoutComponent } from './layouts/shop-layout/shop-layout.component';

const routes: Routes = [
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

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ShopRoutingModule {}
