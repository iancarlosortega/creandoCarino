import {
	ChangeDetectionStrategy,
	Component,
	inject,
	signal,
} from '@angular/core';
import {
	Validators,
	FormGroup,
	FormBuilder,
	ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';

@Component({
	standalone: true,
	imports: [ReactiveFormsModule, MatButtonModule],
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
	private fb = inject(FormBuilder);
	private authService = inject(AuthService);
	private router = inject(Router);
	private toastr = inject(ToastrService);

	isFormSubmitted = signal(false);

	form: FormGroup = this.fb.group({
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required, Validators.minLength(6)]],
	});

	invalidField(fieldName: string) {
		return this.form.get(fieldName)?.invalid && this.isFormSubmitted();
	}

	login() {
		this.isFormSubmitted.set(true);

		if (this.form.invalid) {
			return;
		}

		const { email, password } = this.form.value;

		this.authService
			.loginWithEmailPassword(email, password)
			.then(res => {
				this.router.navigateByUrl('/admin/dashboard');
			})
			.catch(error => {
				this.toastr.error('Creendeciales incorrectas!', 'Usuario inválido');
			});
	}
}
