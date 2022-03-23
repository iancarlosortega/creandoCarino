import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { switchMap, tap } from 'rxjs/operators';
import { Producto } from '../../interfaces/productos.interface';

@Component({
	selector: 'app-categorias',
	templateUrl: './categorias.component.html',
	styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent implements OnInit {
	name: string = '';
	productos: Producto[] = [];

	constructor(
		private activatedRoute: ActivatedRoute,
		private adminService: AdminService
	) {}

	ngOnInit(): void {
		this.activatedRoute.params
			.pipe(
				tap(({ name }) => (this.name = name)),
				switchMap(({ id }) =>
					this.adminService.obtenerProductosPorCategoria(id)
				)
			)
			.subscribe((productos: Producto[]) => {
				this.productos = productos;
			});
	}
}
