
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DemosComponent } from './05_buckets/demos/demos.component';
import { ErrorComponent } from './05_buckets/error/error.component';
import { HomeComponent } from './05_buckets/home/home.component';
import { REComponent } from './05_buckets/re/re.component';
import { ThanksComponent } from './05_buckets/thanks/thanks.component';

const routesForModule: Routes = [
	{ path: 'woops', component: ErrorComponent },
	{ path: 'thanks', component: ThanksComponent },
	{ path: 'demos', component: DemosComponent },
	{ path: 'demos/:demo', component: DemosComponent },
	{ path: 'demos/:demo/:step', component: DemosComponent },
	{ path: 're', redirectTo: '/re/1', pathMatch: 'full' },
	{ path: 're/:re', component: REComponent },
	{ path: '', component: HomeComponent },
	{ path: '**', redirectTo: '/woops', pathMatch: 'full' }
];


@NgModule({
	imports: [RouterModule.forRoot(routesForModule)],
	exports: [RouterModule],
	providers: []
})

export class AppRoutingModule { }
