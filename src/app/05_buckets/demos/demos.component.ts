
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'demos-component',
	templateUrl: './demos.component.html'
})

export class DemosComponent {

	paramsSubscription:any;

	demo:Object;
	step:number;

	demos:Object[] = [
		{
			title: "4 letter words",
			slug: "four-letter-words",
			code: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos suscipit dignissimos tempore cumque, soluta repellat assumenda perspiciatis eligendi omnis dolore fuga, necessitatibus, laboriosam perferendis ipsa atque sed! Incidunt, iste omnis.",
			steps: [
				{
					body: "<p>Let's say we want to select all words that have four characters. How do we do this?</p><p>Maybe we can select four word characters...</p>",
					regex: /\w\w\w\w/,
					flags: "g",
					info: "<p>Hm... wait, isn't there an easier way to get the same result?</p>"
				},
				{
					body: "<p>Alright, much better!</p>",
					regex: /\w{4}/,
					flags: "g",
					info: "<p>Oh... these aren't words, these are word characters.</p>"
				},
				{
					body: "<p>What defines a word? A word has a word boundary before and after it... <strong>done!</strong></p>",
					regex: /\b\w{4}\b/,
					flags: "g"
				}
			]
		},
		{
			title: "Integer & decimal numbers",
			slug: "integer-and-decimal-numbers",
			code: "10rats + .36geese = 3.14cows",
			steps: [
				{
					body: "<p>Looking for a way to select all integers and decimal numbers?</p><p>Easy! Let's just select all digits with <code>\\d</code>.</p>",
					regex: /\d/,
					flags: "g",
					info: "<p>Oh, we need to group them together...</p>"
				},
				{
					body: "<p>We can group them together with a <code>+</code> sign because we expect at least one digit.</p>",
					regex: /\d+/,
					flags: "g",
					info: "<p>Seems like that's working, but those decimals aren't matched as one number.</p>"
				},
				{
					body: "<p>Let's match a decimal...</p>",
					regex: /\d*\.\d+/,
					flags: "g",
					info: "<p>I've added a <code>*</code> instead of a <code>+</code> because we don't need at least one character.</p><p>Oh... the other integers don't match anymore because of the required <code>\\.</code> character.</p>"
				},
				{
					body: "<p>Let's make the whole first part optional.</p>",
					regex: /(\d*\.)?\d+/,
					flags: "g",
					info: "<p>Seems good but...</p>"
				},
				{
					body: "<p>Let's change it to a non-capturing group, because the first part shouldn't be separated from the last... <strong>done!</strong></p>",
					regex: /(?:\d*\.)?\d+/,
					flags: "g"
				}
			]
		}
	];

	constructor(private router:Router,
				private activatedRoute:ActivatedRoute) {}

	ngOnInit() {

		this.paramsSubscription = this.activatedRoute.params.subscribe(params => {

			this.step = ~~params['step'] || 0;

			if(params['demo']) {

				this.demos.forEach(v => { if(v['slug'] === params['demo']) { this.demo = v; }});

			}

		});

	}

	openDemo(demo) {

		this.router.navigateByUrl('/demos/' + demo.slug);

	}

	goHome() {

		this.router.navigateByUrl('/');

	}

	ngOnDestroy() {

		if(this.paramsSubscription) {

			this.paramsSubscription.unsubscribe();

		}

	}

}
