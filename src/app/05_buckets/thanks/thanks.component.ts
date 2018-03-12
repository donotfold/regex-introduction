
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'thanks-component',
	templateUrl: './thanks.component.html'
})

export class ThanksComponent {

	constructor(private router:Router) {}

	ngOnInit() {}

}
