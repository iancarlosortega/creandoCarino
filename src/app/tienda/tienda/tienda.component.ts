import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import {
	trigger,
	transition,
	style,
	query,
	animate,
} from '@angular/animations';
import { AdminService } from '../../services/admin.service';
import { filter } from 'rxjs/operators';
import { Categoria } from '../../interfaces/categorias.interface';
import { scroll } from '../../helpers/scroll';

@Component({
	selector: 'app-tienda',
	templateUrl: './tienda.component.html',
	styleUrls: ['./tienda.component.css'],
	animations: [
		// <-- add your animations here
		trigger('routeAnimations', [
			transition('* <=> *', [
				// Set a default  style for enter and leave
				query(':enter, :leave', [
					style({
						position: 'absolute',
						left: 0,
						width: '100%',
						opacity: 0,
					}),
				]),
				// Animate the new page in
				query(':enter', [
					animate('300ms ease-out', style({ opacity: 1 })),
				]),
			]),
		]),
	],
})
export class TiendaComponent implements OnInit {
	home: boolean = false;
	isOpened: boolean = false;
	categorias: Categoria[] = [];

	constructor(private router: Router, private adminService: AdminService) {}

	ngOnInit(): void {
		const url = this.router.url;

		if (url === '/' || url === '') {
			this.home = true;
		}

		this.router.events
			.pipe(filter(event => event instanceof NavigationEnd))
			.subscribe((event: any) => {
				this.isOpened = false;
				if (event.url === '/' || event.url === '') {
					this.home = true;
				} else {
					this.home = false;
				}
			});

		this.adminService.obtenerCategorias().subscribe(categorias => {
			this.categorias = categorias;
		});
	}

	prepareRoute(outlet: RouterOutlet) {
		return outlet.activatedRouteData.state;
	}

	scrollToSection(anchor: any) {
		scroll(anchor);
	}
}
