import { Component } from '@angular/core';

@Component({
	selector: 'app-contact',
	standalone: true,
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
	socialMediaLinks = [
		{
			name: 'Whatsapp',
			image: 'assets/images/icons/whatsapp.png',
			link: 'https://wa.me/593986526621',
			content: '0986526621',
		},
		{
			name: 'Instagram',
			image: 'assets/images/icons/instagram.png',
			link: 'https://www.instagram.com/creando_220',
			content: '@creando_220',
		},
		{
			name: 'Facebook',
			image: 'assets/images/icons/facebook.png',
			link: 'https://www.facebook.com/creando.carino.9',
			content: 'Creando Cariño',
		},
	];
}
