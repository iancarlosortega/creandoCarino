import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MaterialModule } from 'src/app/material/material.module';
import { CategoriesTableComponent } from '../../components/categories/categories-table/categories-table.component';
import { ProductsTableComponent } from '../../components/products/products-table/products-table.component';
@Component({
	standalone: true,
	imports: [CategoriesTableComponent, MaterialModule, ProductsTableComponent],
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeComponent {
	panelOpenState = signal(true);
}
