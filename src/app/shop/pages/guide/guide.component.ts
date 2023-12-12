import { Component } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
	standalone: true,
	imports: [MatStepperModule],
	templateUrl: './guide.component.html',
	styleUrls: ['./guide.component.css'],
})
export default class GuideComponent {}
