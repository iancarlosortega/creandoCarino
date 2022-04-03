import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
	exports: [
		MatButtonModule,
		MatCardModule,
		MatDialogModule,
		MatExpansionModule,
		MatIconModule,
		MatInputModule,
		MatSelectModule,
		MatStepperModule,
		MatToolbarModule,
	],
})
export class MaterialModule {}
