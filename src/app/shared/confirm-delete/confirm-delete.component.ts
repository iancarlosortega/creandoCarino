import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
	standalone: true,
	imports: [ButtonModule],
	templateUrl: './confirm-delete.component.html',
	styleUrls: ['./confirm-delete.component.css'],
})
export class ConfirmDeleteComponent {
	private dialogRef = inject(MatDialogRef<ConfirmDeleteComponent>);

	confirm() {
		this.dialogRef.close(true);
	}

	cancel() {
		this.dialogRef.close();
	}
}
