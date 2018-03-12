
import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'svgsprite',
	template: `<svg [attr.class]="className + key"><use [attr.id]="id + key" [attr.xlink:href]="xLinkPath() + xLink + key"/></svg>`
})

export class SvgSpriteComponent {

	@Input() key:string;

	constructor(private activatedRoute:ActivatedRoute,
				private router:Router) {}

	className:string = 'graphic graphic--';
	id:string = 'graphic--';
	xLink:string = '#symbol--';

	xLinkPath() {

		let url:string = '';
		let separator:string = '/';

		for(let segment of this.activatedRoute.snapshot.url) { url += separator + segment.path; }
		if(window.location.search) { url += window.location.search; }

		return url;

	}

}
