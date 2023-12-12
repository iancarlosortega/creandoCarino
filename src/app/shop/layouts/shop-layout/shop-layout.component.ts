import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	inject,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoriesService } from '../../services';
import { Category } from '../../interfaces';
import { ContactComponent } from '../../components/contact/contact.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { FooterComponent } from '../../../shared/footer/footer.component';

@Component({
	standalone: true,
	imports: [
		CommonModule,
		RouterModule,
		HeaderComponent,
		ContactComponent,
		FooterComponent,
	],
	templateUrl: './shop-layout.component.html',
	styleUrl: './shop-layout.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopLayoutComponent implements OnInit {
	public categoriesService = inject(CategoriesService);

	categories: Category[] = [];

	ngOnInit(): void {
		this.categoriesService.getAllCategories().subscribe(categories => {
			this.categories = categories;
		});
	}
}
