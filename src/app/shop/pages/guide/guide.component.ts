import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
	standalone: true,
	imports: [MatStepperModule, MatButtonModule],
	templateUrl: './guide.component.html',
	styleUrls: ['./guide.component.css'],
})
export default class GuideComponent {}
