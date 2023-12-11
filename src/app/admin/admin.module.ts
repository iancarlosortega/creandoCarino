import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from './../material/material.module';
import { PrimengModule } from '../primeng/primeng.module';
import { ConfirmDeleteComponent } from '../shared/confirm-delete/confirm-delete.component';

import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';

@NgModule({
	imports: [
		CommonModule,
		AdminRoutingModule,
		ReactiveFormsModule,
		MaterialModule,
		PrimengModule,
		ConfirmDeleteComponent,
		DashboardLayoutComponent,
	],
})
export class AdminModule {}
