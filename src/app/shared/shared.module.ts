import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './../material/material.module';
import { PrimengModule } from '../primeng/primeng.module';

import { LoadingComponent } from './loading/loading.component';

@NgModule({
	declarations: [LoadingComponent],
	imports: [CommonModule, RouterModule, MaterialModule, PrimengModule],
	exports: [LoadingComponent],
})
export class SharedModule {}
