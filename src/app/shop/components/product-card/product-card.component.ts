import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../../interfaces';

@Component({
	selector: 'app-product-card',
	standalone: true,
	imports: [RouterModule, CommonModule, MatCardModule],
	templateUrl: './product-card.component.html',
	styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
	@Input({ required: true }) product!: Product;
}
