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
			provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
			provideAuth(() => getAuth()),
			provideFirestore(() => getFirestore()),
			provideStorage(() => getStorage()),
		]),
	],
};
