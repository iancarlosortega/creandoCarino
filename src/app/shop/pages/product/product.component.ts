import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MaterialModule } from 'src/app/material/material.module';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/product.interface';

@Component({
	standalone: true,
	imports: [CommonModule, MaterialModule],
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.css'],
})
export default class ProductComponent implements OnInit {
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
