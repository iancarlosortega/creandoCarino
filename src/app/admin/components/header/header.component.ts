import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../auth/services/auth.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [RouterModule, MatIconModule],
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
