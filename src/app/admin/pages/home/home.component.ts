import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoriesTableComponent } from '../../components/categories/categories-table/categories-table.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ProductsTableComponent } from '../../components/products/products-table/products-table.component';

@Component({
	standalone: true,
	imports: [CategoriesTableComponent, MaterialModule, ProductsTableComponent],
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
})
export default class HomeComponent {
	public dialog = inject(MatDialog);

	loading: boolean = true;
	visible: boolean = true;
	panelOpenState: boolean = true;
	scrollableProducts: boolean = true;
	disabled: boolean = false;
	emptyMessage: string = 'Ninguna carrera encontrada';

	// obtenerProducto(id: string, categoria: string) {
	// 	// this.openModalEditarProducto();
	// 	this.obs = this.productsService
	// 		.getProductById(id, categoria)
	// 		.subscribe((data: Product) => {
	// 			this.product = data;
	// 			this.productoEditar = data;
	// 			this.url = data.photo_url;
	// 			this.format = 'image';
	// 			this.formularioProducto.setValue({
	// 				name: data.name,
	// 				price: data.price,
	// 				description: data.description,
	// 				subtitle: data.subtitle || '',
	// 				category: data.category,
	// 				photo_url: '',
	// 			});
	// 		});
	// }
}
