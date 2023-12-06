import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { PrimengModule } from 'src/app/primeng/primeng.module';
import { UIService } from 'src/app/services/ui.service';
import { Categoria } from 'src/app/interfaces/categorias.interface';

@Component({
	selector: 'app-sidebar',
	standalone: true,
	imports: [CommonModule, MaterialModule, RouterModule, PrimengModule],
	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
	@Input({ required: true }) public categories: Categoria[] = [];
	menuItems = [
		{
			pathName: 'Home',
			path: '/',
			icon: 'home',
		},
		{
			pathName: 'Método de Pago',
			path: '/pago',
			icon: 'monetization_on',
		},
		{
			pathName: '¿Cómo comprar?',
			path: '/guia',
			icon: 'question_answer',
		},
	];

	public uiService = inject(UIService);
}
