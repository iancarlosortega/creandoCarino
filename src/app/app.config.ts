import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
	InMemoryScrollingFeature,
	InMemoryScrollingOptions,
	provideRouter,
	withInMemoryScrolling,
} from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';

import { provideToastr } from 'ngx-toastr';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment';

const scrollConfig: InMemoryScrollingOptions = {
	scrollPositionRestoration: 'top',
};

const inMemoryScrollingFeature: InMemoryScrollingFeature =
	withInMemoryScrolling(scrollConfig);

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes, inMemoryScrollingFeature),
		provideAnimations(),
		provideToastr(),
		importProvidersFrom([
			provideFirebaseApp(() =>
				initializeApp({
					apiKey: 'AIzaSyADEYmQhpn8CTLtSJ61VgzQga4mRQBAfRQ',
					authDomain: 'creando-carino.firebaseapp.com',
					databaseURL: 'https://creando-carino-default-rtdb.firebaseio.com',
					projectId: 'creando-carino',
					storageBucket: 'creando-carino.appspot.com',
					messagingSenderId: '780338440755',
					appId: '1:780338440755:web:874d6cbbb29cb4b2f99146',
				})
			),
			provideAuth(() => getAuth()),
			provideFirestore(() => getFirestore()),
			provideStorage(() => getStorage()),
		]),
	],
};
