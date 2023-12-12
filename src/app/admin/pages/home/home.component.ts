import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { CategoriesTableComponent } from '../../components/categories/categories-table/categories-table.component';
import { ProductsTableComponent } from '../../components/products/products-table/products-table.component';
@Component({
	standalone: true,
	imports: [
		MatExpansionModule,
		CategoriesTableComponent,
		ProductsTableComponent,
	],
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeComponent {
	panelOpenState = signal(true);
}
