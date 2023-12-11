import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PrimengModule } from 'src/app/primeng/primeng.module';

@Component({
	standalone: true,
	templateUrl: './confirm-delete.component.html',
	styleUrls: ['./confirm-delete.component.css'],
	imports: [PrimengModule],
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
