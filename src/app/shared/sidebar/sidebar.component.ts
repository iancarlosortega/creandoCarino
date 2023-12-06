import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { PrimengModule } from 'src/app/primeng/primeng.module';
import { Category } from 'src/app/shop/interfaces';
import { UIService } from 'src/app/shop/services';

@Component({
	selector: 'app-sidebar',
	standalone: true,
	imports: [CommonModule, MaterialModule, RouterModule, PrimengModule],
	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
	@Input({ required: true }) public categories: Category[] = [];
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
