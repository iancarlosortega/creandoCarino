import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/product.interface';

@Component({
	selector: 'app-categorias',
	templateUrl: './categories.component.html',
	styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
	name: string = '';
	products: Product[] = [];

	private activatedRoute = inject(ActivatedRoute);
	private productsService = inject(ProductsService);

	ngOnInit(): void {
		this.activatedRoute.params
			.pipe(
				tap(({ name }) => (this.name = name)),
				switchMap(({ id }) => this.productsService.getProductsByCategory(id))
			)
			.subscribe((products: Product[]) => {
				this.products = products;
			});
	}
}
