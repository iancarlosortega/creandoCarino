import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	ViewChild,
	inject,
	signal,
} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Table } from 'primeng/table';
import { PrimengModule } from 'src/app/primeng/primeng.module';
import { ProductsService } from 'src/app/shop/services';
import { ProductsEditModalComponent } from '../products-edit-modal/products-edit-modal.component';
import { ProductsCreateModalComponent } from '../products-create-modal/products-create-modal.component';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';
import { Product } from 'src/app/shop/interfaces';

@Component({
	selector: 'app-products-table',
	standalone: true,
	imports: [CommonModule, PrimengModule],
	templateUrl: './products-table.component.html',
	styleUrl: './products-table.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsTableComponent {
	@ViewChild('tableRef') tableRef: Table | undefined;

	private productsService = inject(ProductsService);
	private toastr = inject(ToastrService);
	private observer = inject(BreakpointObserver);
	private dialog = inject(MatDialog);

	products = signal<Product[]>([]);
	isScrollable = signal(true);
	isLoading = signal(true);

	ngOnInit(): void {
		this.productsService.getAllProducts().subscribe(products => {
			this.products.set(products);
			this.isLoading.set(false);
		});
	}

	ngAfterViewInit() {
		setTimeout(() => {
			this.observer.observe(['(min-width: 992px)']).subscribe(res => {
				if (res.matches) {
					this.isScrollable.set(false);
				} else {
					this.isScrollable.set(true);
				}
			});
		}, 0);
	}

	addProduct() {
		this.dialog.open(ProductsCreateModalComponent, {
			autoFocus: false,
		});
	}

	editProduct(id: string, categoryId: string) {
		this.dialog.open(ProductsEditModalComponent, {
			autoFocus: false,
			data: { id, categoryId },
		});
	}

	removeProduct(product: Product) {
		const dialog = this.dialog.open(ConfirmDeleteComponent);

		dialog.afterClosed().subscribe(result => {
			if (result) {
				this.productsService
					.removeProduct(product)
					.then(res => {
						this.toastr.success(
							`El producto fue eliminado con éxito!`,
							'Producto eliminado!'
						);
					})
					.catch(err => {
						this.toastr.error(`${err}`, 'Error al eliminar la carrerar');
						console.log('Error al eliminar la carrera', err);
					});
			}
		});
	}

	filterProducts($event: any, stringVal: string) {
		this.tableRef!.filterGlobal(
			($event.target as HTMLInputElement).value,
			stringVal
		);
	}
}
