import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { Categoria } from '../../interfaces/categorias.interface';
import { scroll } from 'src/app/helpers/scroll';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
	home: boolean = false;
	isOpened: boolean = false;
	categorias: Categoria[] = [];

	constructor(private router: Router, private adminService: AdminService) {}

	ngOnInit(): void {
		const url = this.router.url;

		if (url === '/' || url === '') {
			this.home = true;
		}

		this.adminService.obtenerCategorias().subscribe(categorias => {
			this.categorias = categorias;
		});
	}

	scrollToSection(anchor: any) {
		scroll(anchor);
	}
}
