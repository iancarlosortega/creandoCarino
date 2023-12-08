import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	Input,
	inject,
	signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule, ViewportScroller } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MaterialModule } from 'src/app/material/material.module';
import { Category } from 'src/app/shop/interfaces';
import { UIService } from 'src/app/shop/services';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [SidebarComponent, MaterialModule, CommonModule, RouterModule],
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements AfterViewInit {
	@Input({ required: true }) categories: Category[] = [];

	isDesktopDevice = signal(false);
	isDropdownOpen = signal(false);

	public uiService = inject(UIService);
	private viewportScroller = inject(ViewportScroller);
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
