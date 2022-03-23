import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';

@NgModule({
	exports: [ButtonModule, ProgressSpinnerModule, TableModule],
})
export class PrimengModule {}
