
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'error-component',
	templateUrl: './error.component.html'
})

export class ErrorComponent {

	constructor(private router:Router) {}

	ngOnInit() {}

}
