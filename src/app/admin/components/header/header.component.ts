import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MaterialModule } from 'src/app/material/material.module';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [MaterialModule, RouterModule],
	templateUrl: './header.component.html',
	styleUrl: './header.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
	private authService = inject(AuthService);
	private toastr = inject(ToastrService);
	private router = inject(Router);

	logout() {
		this.authService
			.logout()
			.then(res => {
				this.router.navigateByUrl('/');
			})
			.catch(err => {
				this.toastr.error(err, 'Error');
			});
	}
}
