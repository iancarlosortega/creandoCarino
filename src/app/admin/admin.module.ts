import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from './../material/material.module';
import { SharedModule } from './../shared/shared.module';

import { AdminComponent } from './admin/admin.component';
import { PrimengModule } from '../primeng/primeng.module';
import { EliminarComponent } from './eliminar/eliminar.component';


@NgModule({
  declarations: [
    AdminComponent,
    EliminarComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    PrimengModule,
    SharedModule
  ]
})
export class AdminModule { }
