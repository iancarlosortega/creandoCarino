import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TiendaRoutingModule } from './tienda-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';
import { MaterialModule } from './../material/material.module';

import { SharedModule } from './../shared/shared.module';

import { CardComponent } from './card/card.component';
import { ContactanosComponent } from './contactanos/contactanos.component';
import { HomeComponent } from './home/home.component';
import { VerMasComponent } from './ver-mas/ver-mas.component';
import { TiendaComponent } from './tienda/tienda.component';
import { PagoComponent } from './pago/pago.component';
import { GuiaComponent } from './guia/guia.component';
import { CategoriasComponent } from './categorias/categorias.component';

@NgModule({
	declarations: [
		CardComponent,
		ContactanosComponent,
		HomeComponent,
		VerMasComponent,
		TiendaComponent,
		PagoComponent,
		GuiaComponent,
		CategoriasComponent,
	],
	imports: [
		CommonModule,
		MaterialModule,
		TiendaRoutingModule,
		SharedModule,
		ReactiveFormsModule,
		SwiperModule,
	],
})
export class TiendaModule {}
