import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	Inject,
	OnInit,
	inject,
	signal,
} from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MaterialModule } from 'src/app/material/material.module';
import { PrimengModule } from 'src/app/primeng/primeng.module';
import { Category } from 'src/app/shop/interfaces';
import { CategoriesService } from 'src/app/shop/services';

@Component({
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, MaterialModule, PrimengModule],
	templateUrl: './categories-edit-modal.component.html',
	styleUrl: './categories-edit-modal.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesEditModalComponent implements OnInit {
	private fb = inject(FormBuilder);
	private toastr = inject(ToastrService);
	private dialogRef = inject(MatDialogRef<CategoriesEditModalComponent>);
	private categoriesService = inject(CategoriesService);

	isDisabled = signal(false);

	form: FormGroup = this.fb.group({
		name: ['', [Validators.required, Validators.minLength(3)]],
	});

	constructor(@Inject(MAT_DIALOG_DATA) public data: { id: string }) {}

	ngOnInit(): void {
		this.categoriesService.getCategoryById(this.data.id).subscribe(category => {
			this.form.reset({ name: category.name });
		});
	}

	invalidField(fieldName: string) {
		return (
			this.form.get(fieldName)?.invalid && this.form.get(fieldName)?.touched
		);
	}

	closeModal() {
		this.form.reset();
		this.dialogRef.close();
	}

	updateCategory() {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}

		this.isDisabled.set(true);

		const category: Category = {
			...this.form.value,
			id: this.data.id,
		};

		this.categoriesService
			.updateCategory(category)
			.then(res => {
				this.isDisabled.set(false);
				this.toastr.info(
					`La categoría ${category.name} fue actualizada con éxito`,
					'Categoría actualizada!'
				);
				this.closeModal();
			})
			.catch(err => {
				this.toastr.error(`${err}`, 'Error al actualizar la categoría');
				console.log('Error al actualizar la categoría', err);
			});
	}
}
