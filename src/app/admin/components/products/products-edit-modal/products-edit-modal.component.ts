import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	Inject,
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
import { Category, Product } from 'src/app/shop/interfaces';
import { CategoriesService, ProductsService } from 'src/app/shop/services';

@Component({
	standalone: true,
	imports: [CommonModule, MaterialModule, PrimengModule, ReactiveFormsModule],
	templateUrl: './products-edit-modal.component.html',
	styleUrl: './products-edit-modal.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsEditModalComponent {
	private fb = inject(FormBuilder);
	private toastr = inject(ToastrService);
	private categoriesService = inject(CategoriesService);
	private productsService = inject(ProductsService);
	private dialogRef = inject(MatDialogRef<ProductsEditModalComponent>);

	currentProduct!: Product;
	isUploadingImage = signal(false);
	percentage = signal(0);
	categories = signal<Category[]>([]);
	imagePreviewUrl = signal<string | ArrayBuffer | null>(null);
	selectedFile = signal<File | null>(null);

	form: FormGroup = this.fb.group({
		name: ['', [Validators.required, Validators.minLength(3)]],
		price: ['', [Validators.required, Validators.min(1)]],
		description: ['', [Validators.required, Validators.minLength(5)]],
		category: ['', [Validators.required]],
		subtitle: [''],
	});

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: { id: string; categoryId: string }
	) {}

	ngOnInit(): void {
		this.productsService
			.getProductById(this.data.id, this.data.categoryId)
			.subscribe(product => {
				this.currentProduct = product;
				this.imagePreviewUrl.set(product.photo_url);
				this.form.reset(product);
			});

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

	updateProduct() {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}

		const product: Product = {
			...this.currentProduct,
			...this.form.value,
		};

		if (!this.selectedFile()) {
			this.updateProductWithoutImage(product);
			return;
		}

		this.productsService.removeProductImage(product.photo_filename!);
		this.isUploadingImage.set(true);
		this.form.disable();

		if (this.currentProduct.category === this.form.get('category')?.value) {
			this.productsService
				.updateProduct(product, this.selectedFile()!)
				.subscribe(percentage => {
					this.percentage.set(Math.round(percentage ? percentage : 0));
					if (this.percentage() == 100) {
						setTimeout(() => {
							this.toastr.info(
								`El producto ${product.name} fue actualizado con éxito!`,
								'Producto Actualizado'
							);
							this.closeModal();
						}, 500);
					}
				});
		} else {
			this.productsService.removeProductFromDatabase(this.currentProduct);
			this.productsService
				.addProduct(product, this.selectedFile()!)
				.subscribe(percentage => {
					this.percentage.set(Math.round(percentage ? percentage : 0));
					if (this.percentage() == 100) {
						setTimeout(() => {
							this.toastr.info(
								`El producto ${product.name} fue actualizado con éxito!`,
								'Producto Actualizado'
							);
							this.closeModal();
						}, 500);
					}
				});
		}
	}

	updateProductWithoutImage(product: Product) {
		if (this.currentProduct.category === this.form.get('category')?.value) {
			this.productsService
				._updateProductToDatabase(product)
				.then(_ => {
					this.toastr.info(
						`El producto ${product.name} fue actualizado con éxito!`,
						'Producto Actualizado'
					);
					this.closeModal();
				})
				.catch(err => {
					console.log(err);
					this.toastr.error(`err`, 'Error');
				});
		} else {
			this.productsService.removeProductFromDatabase(this.currentProduct);
			this.productsService
				._addProductToDatabase(product)
				.then(_ => {
					this.toastr.info(
						`El producto ${product.name} fue actualizado con éxito!`,
						'Producto Actualizado'
					);
					this.closeModal();
				})
				.catch(err => {
					console.log(err);
					this.toastr.error(`err`, 'Error');
				});
		}
	}
}
