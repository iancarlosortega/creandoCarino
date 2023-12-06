import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class UIService {
	public isSidebarOpen: boolean = false;

	public openSidebar(): void {
		this.isSidebarOpen = true;
	}

	public closeSidebar(): void {
		this.isSidebarOpen = false;
	}
}
