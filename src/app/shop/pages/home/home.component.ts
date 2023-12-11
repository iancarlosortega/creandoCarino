import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	inject,
	signal,
} from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';

import { SwiperOptions } from 'swiper/types';
import { CategoriesService, ProductsService } from '../../services';
import { Category, Product } from '../../interfaces';

@Component({
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
	public fb = inject(FormBuilder);
	public viewportScroller = inject(ViewportScroller);
	public categoriesService = inject(CategoriesService);
	public productsService = inject(ProductsService);

	form: FormGroup = this.fb.group({
		tipo: ['todos'],
	});

	config: SwiperOptions = {
		spaceBetween: 10,
		grabCursor: true,
		slidesPerView: 1.2,
		navigation: true,
		breakpoints: {
			'499': {
				slidesPerView: 2.2,
			},
			'768': {
				slidesPerView: 2.8,
			},
			'992': {
				slidesPerView: 3.5,
			},
			'1366': {
				slidesPerView: 4.2,
			},
		},
	};

	categories: Category[] = [];
	totalProducts: Product[] = [];
	products = signal<Product[]>([]);
	isLoading = signal(true);

	ngOnInit(): void {
		this.categoriesService.getAllCategories().subscribe(categories => {
			this.categories = categories;
		});

		this.productsService.getAllProducts().subscribe(products => {
			this.totalProducts = products;
			this.products.set(products);
			this.isLoading.set(false);
		});
	}

	cambiarTipo(event: any) {
		if (event.target.value === 'todos')
			return this.products.set(this.totalProducts);
		this.products.set(
			this.totalProducts.filter(
				producto => producto.category === event.target.value
			)
		);
	}

	scrollToSection(elementId: string): void {
		this.viewportScroller.scrollToAnchor(elementId);
	}
}
