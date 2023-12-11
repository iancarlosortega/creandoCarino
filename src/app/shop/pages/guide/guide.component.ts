import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/material/material.module';

@Component({
	standalone: true,
	imports: [MaterialModule],
	templateUrl: './guide.component.html',
	styleUrls: ['./guide.component.css'],
})
export default class GuideComponent {}
