import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-footer',
	standalone: true,
	imports: [RouterModule, CommonModule],
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
	links = [
		{
			name: 'Método de pago',
			url: '/pago',
			imageUrl: '/assets/images/icons/dollars.png',
			imageAlt: 'Método de pago',
		},
		{
			name: '¿Cómo comprar?',
			url: '/guia',
			imageUrl: '/assets/images/icons/guide.png',
			imageAlt: 'Guía de cómo comprar',
		},
		{
			name: 'Regalos 100% personalizados',
			url: '/',
			imageUrl: '/assets/images/icons/gift.png',
			imageAlt: 'Regalos 100% personalizados',
		},
		{
			name: '72 horas de anticipación',
			url: '/',
			imageUrl: '/assets/images/icons/clock.png',
			imageAlt: 'Tiempo de antelación',
		},
		{
			name: 'Entrega a domicilio',
			url: '/',
			imageUrl: '/assets/images/icons/delivery.png',
			imageAlt: 'Entrega a domicilio',
		},
		{
			name: 'Loja, Ecuador',
			url: '/',
			imageUrl: '/assets/images/icons/location.png',
			imageAlt: 'Ubicación',
		},
	];

	socialMediaLinks = [
		{
			name: 'WhatsApp',
			url: 'https://wa.me/593986526621',
			imageUrl: '/assets/images/icons/whatsapp.png',
		},
		{
			name: 'Instagram',
			url: 'https://www.instagram.com/creando_220',
			imageUrl: '/assets/images/icons/instagram.png',
		},
		{
			name: 'Facebook',
			url: 'https://www.facebook.com/creando.carino.9',
			imageUrl: '/assets/images/icons/facebook.png',
		},
		{
			name: 'TikTok',
			url: 'https://www.tiktok.com/@creando_220',
			imageUrl: '/assets/images/icons/tiktok.png',
		},
		{
			name: 'Gmail',
			url: '#',
			imageUrl: '/assets/images/icons/google.png',
		},
	];
}
