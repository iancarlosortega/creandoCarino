import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	inject,
	signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { ProductsService } from '../../services/products.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { Product } from '../../interfaces/product.interface';

@Component({
	standalone: true,
	imports: [ProductCardComponent],
	templateUrl: './categories.component.html',
	styleUrls: ['./categories.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CategoriesComponent implements OnInit {
	name: string = '';
	products = signal<Product[]>([]);
	isLoading = signal(true);

	private activatedRoute = inject(ActivatedRoute);
	private productsService = inject(ProductsService);

	ngOnInit(): void {
		this.activatedRoute.params
			.pipe(
				tap(({ name }) => (this.name = name)),
				switchMap(({ id }) => this.productsService.getProductsByCategory(id))
			)
			.subscribe((products: Product[]) => {
				this.products.set(products);
				this.isLoading.set(false);
			});
	}
}
