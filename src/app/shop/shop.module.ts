import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { SharedModule } from '../shared/shared.module';

import { NavbarComponent } from '../shared/navbar/navbar.component';
import { GuideComponent } from './pages/guide/guide.component';
import { HomeComponent } from './pages/home/home.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { ProductComponent } from './pages/product/product.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProductCardComponent } from './components/product-card/product-card.component';

// Swiper Config
import { register } from 'swiper/element/bundle';
import { SwiperDirective } from './directives/swiper.directive';
register();

@NgModule({
	declarations: [
		CategoriesComponent,
		ContactComponent,
		GuideComponent,
		HomeComponent,
		PaymentComponent,
		ProductCardComponent,
		ProductComponent,
		SwiperDirective,
	],
	imports: [
		CommonModule,
		MaterialModule,
		ShopRoutingModule,
		SharedModule,
		ReactiveFormsModule,
		NavbarComponent,
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ShopModule {}
