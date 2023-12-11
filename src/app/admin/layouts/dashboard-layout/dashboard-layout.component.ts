import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
	standalone: true,
	imports: [HeaderComponent, RouterModule],
	templateUrl: './dashboard-layout.component.html',
	styleUrl: './dashboard-layout.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLayoutComponent {}
