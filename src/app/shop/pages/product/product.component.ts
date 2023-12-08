import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Product } from '../../interfaces/product.interface';
import { ProductsService } from '../../services/products.service';

@Component({
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
	product?: Product;
	customUrl: string = '';
	isLoading = signal(true);

	private activatedRoute = inject(ActivatedRoute);
	private productsService = inject(ProductsService);

	ngOnInit(): void {
		this.activatedRoute.params
			.pipe(
				switchMap(({ category, id }) =>
					this.productsService.getProductById(id, category)
				)
			)
			.subscribe((product: Product) => {
				this.product = product;
				const msg = `Hola, por favor podría ayudarme con el regalo: ${this.product.name}`;
				this.customUrl = `https://wa.me/593986526621?text=${msg}`;
				this.isLoading.set(false);
			});
	}
}
