import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	OnInit,
	ViewChild,
	inject,
	signal,
} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ToastrService } from 'ngx-toastr';
import { Table } from 'primeng/table';
import { MatDialog } from '@angular/material/dialog';
import { PrimengModule } from 'src/app/primeng/primeng.module';
import { CategoriesService } from 'src/app/shop/services';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';
import { CategoriesCreateModalComponent } from '../categories-create-modal/categories-create-modal.component';
import { CategoriesEditModalComponent } from '../categories-edit-modal/categories-edit-modal.component';
import { Category } from 'src/app/shop/interfaces';

@Component({
	selector: 'app-categories-table',
	standalone: true,
	imports: [PrimengModule],
	templateUrl: './categories-table.component.html',
	styleUrl: './categories-table.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesTableComponent implements OnInit, AfterViewInit {
	@ViewChild('tableRef') tableRef: Table | undefined;

	private categoriesService = inject(CategoriesService);
	private toastr = inject(ToastrService);
	private observer = inject(BreakpointObserver);
	private dialog = inject(MatDialog);

	categories = signal<Category[]>([]);
	isScrollable = signal(true);
	isLoading = signal(true);

	ngOnInit(): void {
		this.categoriesService.getAllCategories().subscribe(categories => {
			this.categories.set(categories);
			this.isLoading.set(false);
		});
	}

	ngAfterViewInit() {
		setTimeout(() => {
			this.observer.observe(['(min-width: 540px)']).subscribe(res => {
				if (res.matches) {
					this.isScrollable.set(false);
				} else {
					this.isScrollable.set(true);
				}
			});
		}, 0);
	}

	addCategory() {
		this.dialog.open(CategoriesCreateModalComponent, {
			autoFocus: false,
		});
	}

	editCategory(id: string) {
		this.dialog.open(CategoriesEditModalComponent, {
			autoFocus: false,
			data: { id },
		});
	}

	removeCategory(id: string) {
		const dialog = this.dialog.open(ConfirmDeleteComponent);

		dialog.afterClosed().subscribe((result: boolean) => {
			if (result) {
				this.categoriesService
					.removeCategory(id)
					.then(res => {
						this.toastr.success(
							'La categoría fue eliminada con éxito',
							'Categoria eliminada!'
						);
					})
					.catch(err => {
						this.toastr.error(`${err}`, 'Error al eliminar la categoría');
						console.log(err);
					});
			}
		});
	}

	filterCategories($event: any, stringVal: string) {
		this.tableRef!.filterGlobal(
			($event.target as HTMLInputElement).value,
			stringVal
		);
	}
}
