import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Product } from '../../interfaces/product.interface';
import { Category } from '../../interfaces/category.interface';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
	product!: Product;
	category!: Category;
	id!: number;
	customUrl: string = '';

	private activatedRoute = inject(ActivatedRoute);
	private categoriesService = inject(CategoriesService);
	private productsService = inject(ProductsService);

	ngOnInit(): void {
		this.activatedRoute.params
			.pipe(
				tap(({ category }) => {
					this.categoriesService
						.getCategoryById(category)
						.subscribe(category => {
							this.category = category;
						});
				}),
				switchMap(({ category, id }) =>
					this.productsService.getProductById(id, category)
				)
			)
			.subscribe((product: Product) => {
				this.product = product;
				const msg = `Hola, por favor podría ayudarme con el regalo: ${this.product.name}`;
				this.customUrl = `https://wa.me/593986526621?text=${msg}`;
			});
	}
}
