import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './../material/material.module';
import { PrimengModule } from '../primeng/primeng.module';

import { FooterComponent } from './footer/footer.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
	declarations: [FooterComponent, LoadingComponent],
	imports: [CommonModule, RouterModule, MaterialModule, PrimengModule],
	exports: [FooterComponent, LoadingComponent],
})
export class SharedModule {}
