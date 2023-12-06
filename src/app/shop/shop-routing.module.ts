import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ProductComponent } from './pages/product/product.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { GuideComponent } from './pages/guide/guide.component';

const routes: Routes = [
	{
		path: '',
		children: [
			{ path: '', component: HomeComponent },
			{ path: ':name/:id', component: CategoriesComponent },
			{ path: 'producto/:category/:id', component: ProductComponent },
			{ path: 'pago', component: PaymentComponent },
			{ path: 'guia', component: GuideComponent },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ShopRoutingModule {}
