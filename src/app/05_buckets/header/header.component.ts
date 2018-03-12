
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'header-component',
	templateUrl: './header.component.html'
})

export class HeaderComponent {

	@Input() size:string = 'large';

	constructor(private router:Router) {}

	ngOnInit() {}

	goHome() {

		if(this.router.url !== '/') { this.router.navigateByUrl('/'); }

	}

}
