
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'home-component',
	templateUrl: './home.component.html'
})

export class HomeComponent {

	constructor(private router:Router) {}

	ngOnInit() {}

	next() {

		this.router.navigateByUrl('/re');

	}

}
