import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { HeaderComponent } from '../shared/header/header.component';

@NgModule({
	imports: [
		CommonModule,
		MaterialModule,
		ShopRoutingModule,
		ReactiveFormsModule,
		HeaderComponent,
	],
})
export class ShopModule {}
