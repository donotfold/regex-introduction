
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'demo-component',
	templateUrl: './demo.component.html'
})

export class DemoComponent {

	@Input() demo:Object;
	@Input() step:number;

	constructor(private router:Router) {}

	ngOnInit() {}

	nextStep() {

		if(this.step + 1 < this.demo['steps'].length) {

			this.router.navigateByUrl('/demos/' + this.demo['slug'] + '/' + (this.step + 1));

		}

	}

	prevStep() {

		if(this.step > 0) {

			this.router.navigateByUrl('/demos/' + this.demo['slug'] + (this.step - 1 ? '/' + (this.step - 1) : ''));

		}

	}

}
