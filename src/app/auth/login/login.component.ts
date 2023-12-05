import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent {
	loginForm: UntypedFormGroup = this.fb.group({
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required, Validators.minLength(6)]],
	});

	formSubmitted: boolean = false;
	error: boolean = false;

	constructor(
		private fb: UntypedFormBuilder,
		private authService: AuthService,
		private router: Router,
		private toastr: ToastrService
	) {}

	campoNoValido(campo: string) {
		return this.loginForm.get(campo)?.invalid && this.formSubmitted;
	}

	login() {
		this.formSubmitted = true;

		if (this.loginForm.invalid) {
			return;
		}

		const { email, password } = this.loginForm.value;

		this.authService
			.loginWithEmailPassword(email, password)
			.then(res => {
				this.router.navigateByUrl('/admin');
			})
			.catch(error => {
				this.toastr.error(
					'Creendeciales incorrectas!',
					'Usuario inválido'
				);
			});
	}
}
