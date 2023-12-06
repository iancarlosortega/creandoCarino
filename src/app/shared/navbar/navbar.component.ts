import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	OnInit,
	inject,
	signal,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
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
export class NavbarComponent implements OnInit, AfterViewInit {
	isDesktopDevice = signal(false);
	home: boolean = false;
	isOpened: boolean = false;
	categorias: Categoria[] = [];

	public uiService = inject(UIService);
	private viewportScroller = inject(ViewportScroller);
	private router = inject(Router);
	private adminService = inject(AdminService);
	private observer = inject(BreakpointObserver);

	ngOnInit(): void {
		const url = this.router.url;

		if (url === '/' || url === '') {
			this.home = true;
		}

		this.adminService.obtenerCategorias().subscribe(categorias => {
			this.categorias = categorias;
		});
	}

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
