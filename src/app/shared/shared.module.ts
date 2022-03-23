import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './../material/material.module';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
	declarations: [FooterComponent, NavbarComponent, LoadingComponent],
	imports: [CommonModule, RouterModule, MaterialModule],
	exports: [FooterComponent, NavbarComponent, LoadingComponent],
})
export class SharedModule {}
