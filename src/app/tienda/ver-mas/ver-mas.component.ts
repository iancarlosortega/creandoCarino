import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../../interfaces/productos.interface';
import { switchMap, tap } from 'rxjs/operators';
import { AdminService } from '../../services/admin.service';

@Component({
	selector: 'app-ver-mas',
	templateUrl: './ver-mas.component.html',
	styleUrls: ['./ver-mas.component.css'],
})
export class VerMasComponent implements OnInit {
	producto!: Producto;
	productosRelacionados: Producto[] = [];
	id!: number;

	constructor(
		private activatedRoute: ActivatedRoute,
		private adminService: AdminService
	) {}

	ngOnInit(): void {
		this.activatedRoute.params
			.pipe(
				tap(({ category }) =>
					this.adminService
						.obtenerProductosPorCategoria(category)
						.subscribe(productos => {
							this.productosRelacionados = productos;
						})
				),
				switchMap(({ category, id }) =>
					this.adminService.obtenerProductoPorId(id, category)
				)
			)
			.subscribe((producto: Producto) => {
				this.producto = producto;
			});
	}
}
