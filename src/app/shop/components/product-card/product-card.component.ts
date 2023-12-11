import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { Product } from '../../interfaces';

@Component({
	selector: 'app-product-card',
	standalone: true,
	imports: [RouterModule, MaterialModule, CommonModule],
	templateUrl: './product-card.component.html',
	styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
	@Input({ required: true }) product!: Product;
}
