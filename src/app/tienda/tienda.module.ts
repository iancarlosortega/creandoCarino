import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TiendaRoutingModule } from './tienda-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../material/material.module';

import { SharedModule } from './../shared/shared.module';

import { CardComponent } from './card/card.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ContactanosComponent } from './contactanos/contactanos.component';
import { GuiaComponent } from './guia/guia.component';
import { HomeComponent } from './home/home.component';
import { PagoComponent } from './pago/pago.component';
import { VerMasComponent } from './ver-mas/ver-mas.component';

// Swiper Config
import { register } from 'swiper/element/bundle';
import { SwiperDirective } from './directives/swiper.directive';
import { NavbarComponent } from '../shared/navbar/navbar.component';
register();

@NgModule({
	declarations: [
		CardComponent,
		CategoriasComponent,
		ContactanosComponent,
		GuiaComponent,
		HomeComponent,
		PagoComponent,
		VerMasComponent,
		SwiperDirective,
	],
	imports: [
		CommonModule,
		MaterialModule,
		TiendaRoutingModule,
		SharedModule,
		ReactiveFormsModule,
		NavbarComponent,
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TiendaModule {}
