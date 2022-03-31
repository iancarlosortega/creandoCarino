import {
	animate,
	state,
	style,
	transition,
	trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Categoria } from '../../interfaces/categorias.interface';
import { Producto } from '../../interfaces/productos.interface';
import { scroll } from 'src/app/helpers/scroll';

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, SwiperOptions } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination]);
@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
	animations: [
		trigger('openClose', [
			// ...
			state(
				'open',
				style({
					height: '200px',
					opacity: 1,
					backgroundColor: 'yellow',
				})
			),
			state(
				'closed',
				style({
					height: '100px',
					opacity: 0.8,
					backgroundColor: 'blue',
				})
			),
			transition('open => closed', [animate('1s')]),
			transition('closed => open', [animate('0.5s')]),
		]),
	],
})
export class HomeComponent implements OnInit {
	miFormulario: FormGroup = this.fb.group({
		tipo: ['todos'],
	});

	home: boolean = false;
	isOpened: boolean = false;
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

	scrollToSection(anchor: any) {
		scroll(anchor);
	}
}
