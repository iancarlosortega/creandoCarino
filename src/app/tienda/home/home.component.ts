import {
	animate,
	state,
	style,
	transition,
	trigger,
} from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Categoria } from '../../interfaces/categorias.interface';
import { Producto } from '../../interfaces/productos.interface';

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, SwiperOptions } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination]);
@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
	animations: [
		trigger('fadeInOut', [
			state(
				'void',
				style({
					opacity: 0,
				})
			),
			transition('void <=> *', animate(1000)),
		]),
	],
})
export class HomeComponent implements OnInit {
	miFormulario: FormGroup = this.fb.group({
		tipo: ['todos'],
	});

	loading: boolean = true;
	categorias: Categoria[] = [];
	productos: Producto[] = [];
	productosTotales: Producto[] = [];

	config: SwiperOptions = {
		breakpoints: {
			// when window width is <= 499px
			499: {
				slidesPerView: 2.2,
			},
			// when window width is <= 999px
			768: {
				slidesPerView: 2.8,
			},
			// when window width is <= 999px
			992: {
				slidesPerView: 4.2,
			},
		},
	};

	constructor(private fb: FormBuilder, private adminService: AdminService) {}

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
}
