import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	Input,
	OnInit,
	inject,
	signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { Categoria } from '../../interfaces/categorias.interface';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule, ViewportScroller } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MaterialModule } from 'src/app/material/material.module';
import { UIService } from 'src/app/services/ui.service';

@Component({
	selector: 'app-navbar',
	standalone: true,
	imports: [SidebarComponent, MaterialModule, CommonModule, RouterModule],
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements AfterViewInit {
	@Input({ required: true }) categories: Categoria[] = [];

	isDesktopDevice = signal(false);
	isDropdownOpen = signal(false);

	public uiService = inject(UIService);
	private viewportScroller = inject(ViewportScroller);
	private adminService = inject(AdminService);
	private observer = inject(BreakpointObserver);

	ngAfterViewInit() {
		setTimeout(() => {
			this.observer.observe(['(min-width: 992px)']).subscribe(res => {
				if (res.matches) {
					this.isDesktopDevice.set(true);
				} else {
					this.isDesktopDevice.set(false);
				}
			});
		}, 0);
	}

	scrollToSection(elementId: string): void {
		this.viewportScroller.scrollToAnchor(elementId);
	}
}
