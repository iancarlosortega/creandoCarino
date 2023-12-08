import { Component, inject } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent {
	private fb = inject(FormBuilder);
	private authService = inject(AuthService);
	private router = inject(Router);
	private toastr = inject(ToastrService);

	form: FormGroup = this.fb.group({
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required, Validators.minLength(6)]],
	});

	isFormSubmitted: boolean = false;

	invalidField(fieldName: string) {
		return this.form.get(fieldName)?.invalid && this.isFormSubmitted;
	}

	login() {
		this.isFormSubmitted = true;

		if (this.form.invalid) {
			return;
		}

		const { email, password } = this.form.value;

		this.authService
			.loginWithEmailPassword(email, password)
			.then(res => {
				this.router.navigateByUrl('/admin');
			})
			.catch(error => {
				this.toastr.error('Creendeciales incorrectas!', 'Usuario inválido');
			});
	}
}
