
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

@Component({
	selector: 'regex',
	template: `<div class="wrapper"><header-component [size]="size"></header-component><router-outlet></router-outlet><footer-component></footer-component></div>`
})

export class AppComponent {

	size:string = 'large';

	constructor(private router:Router) {}

	ngOnInit() {

		this.router.events.subscribe((evt) => {

			if(!(evt instanceof NavigationEnd)) { return; }

			//window.scrollTo(0, 0);
			document.body.classList.toggle('is-home', this.router.url === '/');

		});

	}

}
