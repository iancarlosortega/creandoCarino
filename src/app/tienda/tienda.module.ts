import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TiendaRoutingModule } from './tienda-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
// import { SwiperModule } from 'swiper/angular';
import { MaterialModule } from './../material/material.module';

import { SharedModule } from './../shared/shared.module';

import { CardComponent } from './card/card.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ContactanosComponent } from './contactanos/contactanos.component';
import { GuiaComponent } from './guia/guia.component';
import { HomeComponent } from './home/home.component';
import { PagoComponent } from './pago/pago.component';
import { VerMasComponent } from './ver-mas/ver-mas.component';

@NgModule({
	declarations: [
		CardComponent,
		CategoriasComponent,
		ContactanosComponent,
		GuiaComponent,
		HomeComponent,
		PagoComponent,
		VerMasComponent,
	],
	imports: [
		CommonModule,
		MaterialModule,
		TiendaRoutingModule,
		SharedModule,
		ReactiveFormsModule,
		// SwiperModule,
	],
})
export class TiendaModule {}
