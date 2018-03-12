
import { Component, OnInit } from '@angular/core';
import { Http, Jsonp } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
	selector: 'svgsprite-source',
	template: `<span [innerHTML]="svgHTML"></span>`
})

export class SpriteSourceComponent {

	private svgSpriteUrl:string = 'assets/icons/sprite.svg';
	public svgHTML:any;

	constructor(private sanitizer:DomSanitizer,
				private http:Http,
				private json:Jsonp) {}

	ngOnInit() {

		this.http.get(this.svgSpriteUrl)
			.map((res:any) => this.sanitizer.bypassSecurityTrustHtml(res._body))
			.catch((error:any) => Observable.throw('Could not find SVG sprite file: ' + this.svgSpriteUrl))
			.subscribe(res => this.svgHTML = res, err => { if(console && console.error) { console.error(err); }});

	}

}
