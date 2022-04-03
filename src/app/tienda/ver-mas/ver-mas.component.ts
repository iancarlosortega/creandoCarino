import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { switchMap, tap } from 'rxjs/operators';
import { Producto } from '../../interfaces/productos.interface';
import { Categoria } from '../../interfaces/categorias.interface';

@Component({
	selector: 'app-ver-mas',
	templateUrl: './ver-mas.component.html',
	styleUrls: ['./ver-mas.component.css'],
})
export class VerMasComponent implements OnInit {
	producto!: Producto;
	categoria!: Categoria;
	id!: number;
	urlPersonalizado: string = '';

	constructor(
		private activatedRoute: ActivatedRoute,
		private adminService: AdminService
	) {}

	ngOnInit(): void {
		this.activatedRoute.params
			.pipe(
				tap(({ category }) => {
					this.adminService
						.obtenerCategoriaPorId(category)
						.subscribe(categoria => {
							this.categoria = categoria;
						});
				}),
				switchMap(({ category, id }) =>
					this.adminService.obtenerProductoPorId(id, category)
				)
			)
			.subscribe((producto: Producto) => {
				this.producto = producto;
				const msg = `Hola, por favor podría ayudarme con el regalo: ${this.producto.name}`;
				this.urlPersonalizado = `https://wa.me/593986526621?text=${msg}`;
			});
	}
}
