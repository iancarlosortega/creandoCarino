import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { UIService } from '../../shop/services';
import { Category } from '../../shop/interfaces';

@Component({
	selector: 'app-sidebar',
	standalone: true,
	imports: [
		CommonModule,
		RouterModule,
		SidebarModule,
		MatExpansionModule,
		MatIconModule,
	],
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
