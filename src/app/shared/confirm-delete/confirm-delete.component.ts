import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material/material.module';

@Component({
	standalone: true,
	templateUrl: './confirm-delete.component.html',
	styleUrls: ['./confirm-delete.component.css'],
	imports: [MaterialModule],
})
export class ConfirmDeleteComponent {
	constructor(private dialogRef: MatDialogRef<ConfirmDeleteComponent>) {}

	borrar() {
		//Confirmar la eliminacion enviando el valor de true
		this.dialogRef.close(true);
	}

	cerrar() {
		this.dialogRef.close();
	}
}
