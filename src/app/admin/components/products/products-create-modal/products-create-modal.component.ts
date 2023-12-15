import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	inject,
	signal,
	computed,
	effect,
} from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ButtonModule } from 'primeng/button';
import { MatSelectModule } from '@angular/material/select';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CategoriesService, ProductsService } from '../../../../shop/services';
import { Category, Product } from '../../../../shop/interfaces';

@Component({
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatInputModule,
		MatSelectModule,
		MatIconModule,
		ProgressSpinnerModule,
		ButtonModule,
	],
	templateUrl: './products-create-modal.component.html',
	styleUrl: './products-create-modal.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsCreateModalComponent implements OnInit {
	private fb = inject(FormBuilder);
	private toastr = inject(ToastrService);
	private categoriesService = inject(CategoriesService);
	private productsService = inject(ProductsService);
	private dialogRef = inject(MatDialogRef<ProductsCreateModalComponent>);

	isUploadingImage = signal(false);
	percentage = signal(0);
	categories = signal<Category[]>([]);
	imagePreviewUrl = signal<string | ArrayBuffer | null>(null);
	selectedFile = signal<File | null>(null);

	//! DON'T DELETE THIS LINE, MAKES SIGNAL UPDATE, FIX LATER
	percentageEffect = effect(() => {
		console.log('percentage', this.percentage());
	});

	form: FormGroup = this.fb.group({
		name: ['', [Validators.required, Validators.minLength(3)]],
		price: ['', [Validators.required, Validators.min(1)]],
		description: ['', [Validators.required, Validators.minLength(5)]],
		category: ['', [Validators.required]],
		subtitle: [''],
	});

	ngOnInit(): void {
		this.categoriesService
			.getAllCategories()
			.subscribe((categories: Category[]) => {
				this.categories.set(categories);
			});
	}

	invalidField(fieldName: string) {
		return (
			this.form.get(fieldName)?.invalid && this.form.get(fieldName)?.touched
		);
	}

	closeModal() {
		this.dialogRef.close();
	}

	selectFile(event: any): void {
		const file = event.target.files && event.target.files[0];

		if (file) {
			if (!file.type.includes('image')) {
				this.toastr.error(
					'Por favor, seleccione un archivo de tipo imagen',
					'Formato inválido'
				);
				return;
			}

			this.selectedFile.set(file);

			// Create the image preview
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = event => {
				this.imagePreviewUrl.set((<FileReader>event.target).result);
			};
		}
	}

	addProduct() {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}

		const product: Product = {
			...this.form.value,
			photo_filename: this.selectedFile()?.name,
		};

		if (this.selectedFile()) {
			this.isUploadingImage.set(true);
			this.form.disable();
			this.productsService
				.addProduct(product, this.selectedFile()!)
				.subscribe(percentage => {
					this.percentage.set(Math.round(percentage ? percentage : 0));
					if (this.percentage() == 100) {
						setTimeout(() => {
							this.toastr.success(
								`El producto ${product.name} fue registrado con éxito!`,
								'Producto Registrado'
							);
							this.closeModal();
						}, 500);
					}
				});
		} else {
			this.toastr.error('Por favor, seleccione una imagen para subir', 'Error');
		}
	}
}
