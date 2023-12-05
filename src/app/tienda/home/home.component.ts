import { Component, OnInit, inject } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Categoria } from '../../interfaces/categorias.interface';
import { Producto } from '../../interfaces/productos.interface';

import { SwiperOptions } from 'swiper/types';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
	public viewportScroller = inject(ViewportScroller);
	public fb = inject(FormBuilder);
	public adminService = inject(AdminService);

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
	categorias: Categoria[] = [];
	productos: Producto[] = [];
	productosTotales: Producto[] = [];

	ngOnInit(): void {
		this.adminService.obtenerCategorias().subscribe(categorias => {
			this.categorias = categorias;
		});

		this.adminService.obtenerProductos().subscribe(productos => {
			this.productos = productos;
			this.productosTotales = productos;
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
