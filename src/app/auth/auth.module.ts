import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../material/material.module';

@NgModule({
	imports: [
		CommonModule,
		AuthRoutingModule,
		ReactiveFormsModule,
		MaterialModule,
	],
})
export class AuthModule {}
