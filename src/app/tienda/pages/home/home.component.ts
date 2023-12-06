import { Component, OnInit, inject } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';

import { SwiperOptions } from 'swiper/types';
import { CategoriesService, ProductsService } from '../../services';
import { Category, Product } from '../../interfaces';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
	public viewportScroller = inject(ViewportScroller);
	public fb = inject(FormBuilder);
	public categoriesService = inject(CategoriesService);
	public productsService = inject(ProductsService);

	miFormulario: FormGroup = this.fb.group({
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
				slidesPerView: 4.2,
			},
		},
	};

	home: boolean = false;
	isOpened: boolean = false;
	loading: boolean = true;
	categories: Category[] = [];
	productos: Product[] = [];
	productosTotales: Product[] = [];

	ngOnInit(): void {
		this.categoriesService.getAllCategories().subscribe(categories => {
			this.categories = categories;
		});

		this.productsService.getAllProducts().subscribe(products => {
			this.productos = products;
			this.productosTotales = products;
			this.loading = false;
		});
	}

	cambiarTipo(event: any) {
		this.productos = this.productosTotales;
		if (event.target.value !== 'todos') {
			this.productos = this.productos.filter(
				producto => producto.category === event.target.value
			);
		}
	}

	scrollToSection(elementId: string): void {
		this.viewportScroller.scrollToAnchor(elementId);
	}
}
