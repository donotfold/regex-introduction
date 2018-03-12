
// main

	import { BrowserModule } from '@angular/platform-browser';
	import { NgModule } from '@angular/core';
	import { FormsModule } from '@angular/forms';
	import { HttpModule, JsonpModule } from '@angular/http';


// external services

	//--


// plugins

	//--


// custom pipes

	import { highlightPipe } from './00_pipes/highlight.pipe';
	import { noHtmlPipe } from './00_pipes/noHTML.pipe';
	import { SafeHtmlPipe } from './00_pipes/safeHtml.pipe';
	import { regexPipe } from './00_pipes/regex.pipe';


// custom services

	import { ApiCall } from './00_services/apicall.service';


// components

	import { AppRoutingModule } from './app-routing.module';
	import { AppComponent } from './00_global/app.component';

	import { SpriteSourceComponent } from './02_atoms/symbols/sprite.component';
	import { SvgSpriteComponent } from './02_atoms/symbols/svg.component';

	import { DemoComponent } from './04_organisms/demo/demo.component';

	import { DemosComponent } from './05_buckets/demos/demos.component';
	import { ErrorComponent } from './05_buckets/error/error.component';
	import { FooterComponent } from './05_buckets/footer/footer.component';
	import { HeaderComponent } from './05_buckets/header/header.component';
	import { HomeComponent } from './05_buckets/home/home.component';
	import { REComponent } from './05_buckets/re/re.component';
	import { ThanksComponent } from './05_buckets/thanks/thanks.component';


// AppModule

	@NgModule({
		declarations: [
			highlightPipe,
			noHtmlPipe,
			SafeHtmlPipe,
			regexPipe,
			AppComponent,
			SpriteSourceComponent,
			SvgSpriteComponent,
			DemoComponent,
			DemosComponent,
			ErrorComponent,
			FooterComponent,
			HeaderComponent,
			HomeComponent,
			REComponent,
			ThanksComponent
		],
		imports: [
			BrowserModule,
			FormsModule,
			HttpModule,
			JsonpModule,
			AppRoutingModule
		],
		providers: [
			ApiCall
		],
		bootstrap: [
			AppComponent
		]
	})

	export class AppModule {}

