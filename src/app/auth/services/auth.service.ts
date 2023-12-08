import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private afAuth: AngularFireAuth) {}

	loginWithEmailPassword(email: string, password: string) {
		return this.afAuth.signInWithEmailAndPassword(email, password);
	}

	logout() {
		return this.afAuth.signOut();
	}
}