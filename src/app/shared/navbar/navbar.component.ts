import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { Categoria } from '../../interfaces/categorias.interface';
import { scroll } from 'src/app/helpers/scroll';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, AfterViewInit {
	toolBar: boolean = false;
	visibleSidebar: boolean = false;
	home: boolean = false;
	isOpened: boolean = false;
	categorias: Categoria[] = [];

	menuItems = [
		{
			titulo: 'Home',
			route: '/play/home',
			icono: 'home',
		},
		{
			titulo: 'Carreras',
			route: '/play/carreras',
			icono: 'data_usage',
		},
		{
			titulo: 'Asignaturas',
			route: '/play/materias',
			icono: 'library_books',
		},
		{
			titulo: 'Historial',
			route: '/play/historial',
			icono: 'history',
		},
		{
			titulo: 'Editar Perfil',
			route: '/play/perfil',
			icono: 'account_box',
		},
		{
			titulo: 'Sobre Nosotros',
			route: '/play/nosotros',
			icono: 'supervised_user_circle',
		},
	];

	constructor(
		private router: Router,
		private adminService: AdminService,
		private observer: BreakpointObserver
	) {}

	ngOnInit(): void {
		const url = this.router.url;

		if (url === '/' || url === '') {
			this.home = true;
		}

		this.adminService.obtenerCategorias().subscribe(categorias => {
			this.categorias = categorias;
		});
	}

	ngAfterViewInit() {
		setTimeout(() => {
			this.observer.observe(['(min-width: 992px)']).subscribe(res => {
				if (res.matches) {
					this.toolBar = false;
				} else {
					this.toolBar = true;
				}
			});
		}, 0);
	}

	scrollToSection(anchor: any) {
		scroll(anchor);
	}
}
