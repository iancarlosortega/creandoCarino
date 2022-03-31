import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';

@NgModule({
	exports: [ButtonModule, ProgressSpinnerModule, SidebarModule, TableModule],
})
export class PrimengModule {}
