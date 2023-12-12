import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	inject,
	signal,
} from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ButtonModule } from 'primeng/button';
import { CategoriesService } from '../../../../shop/services';
import { Category } from '../../../../shop/interfaces';

@Component({
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		ButtonModule,
	],
	templateUrl: './categories-create-modal.component.html',
	styleUrl: './categories-create-modal.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesCreateModalComponent {
	private fb = inject(FormBuilder);
	private toastr = inject(ToastrService);
	private categoriesService = inject(CategoriesService);
	private dialogRef = inject(MatDialogRef<CategoriesCreateModalComponent>);

	isDisabled = signal(false);

	form: FormGroup = this.fb.group({
		name: ['', [Validators.required, Validators.minLength(3)]],
	});

	invalidField(fieldName: string) {
		return (
			this.form.get(fieldName)?.invalid && this.form.get(fieldName)?.touched
		);
	}

	closeModal() {
		this.form.reset();
		this.dialogRef.close();
	}

	addCategory() {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}
		this.isDisabled.set(true);

		const category: Category = {
			name: this.form.get('name')?.value,
		};

		this.categoriesService
			.addCategory(category)
			.then(res => {
				this.isDisabled.set(false);
				this.form.reset();
				this.toastr.success(
					`La categoría ${category.name} fue agregada con éxito!`,
					'Categoría agregada'
				);
				this.dialogRef.close();
			})
			.catch(err => {
				this.toastr.error(`${err}`, 'Error al agregar la categoría');
				console.log('Error al agregar la categoría', err);
			});
	}
}
