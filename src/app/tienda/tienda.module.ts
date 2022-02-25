import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TiendaRoutingModule } from './tienda-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../material/material.module';
import { NgxGlideModule } from 'ngx-glide';

import { SharedModule } from './../shared/shared.module';

import { CardComponent } from './card/card.component'; 
import { ContactanosComponent } from './contactanos/contactanos.component';
import { DesayunosComponent } from './desayunos/desayunos.component';
import { HomeComponent } from './home/home.component';
import { VerMasComponent } from './ver-mas/ver-mas.component';
import { TiendaComponent } from './tienda/tienda.component';


@NgModule({
  declarations: [
    CardComponent,
    ContactanosComponent,
    DesayunosComponent,
    HomeComponent,
    VerMasComponent,
    TiendaComponent
  ],
  imports: [
    CommonModule,
    NgxGlideModule,
    MaterialModule,
    TiendaRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class TiendaModule { }
