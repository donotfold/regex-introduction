
import { Injectable }						from '@angular/core';
import { Http, Jsonp }						from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class ApiCall {

	constructor(private http:Http,
				private json:Jsonp) {}

	put(path:string, vars:any, successFn:any=function(r:any){}, errorFn:any=function(r:any){}) {

		this.http.put(path, vars)
			.map((res:any) => { return res.ok && res._body == '' ? null : res.json(); })
			.catch((error:any) => Observable.throw(error.json().Message || 'Server error'))
			.subscribe(res => { successFn(res) }, error => { errorFn(error) });

	}

	post(path:string, vars:any, successFn:any=function(r:any){}, errorFn:any=function(r:any){}) {

		this.http.post(path, vars)
			.map((res:any) => { return res.ok && res._body == '' ? null : res.json(); })
			.catch((error:any) => Observable.throw(error.json().Message || 'Server error'))
			.subscribe(res => { successFn(res) }, error => { errorFn(error) });

	}

	get(path:string, successFn:any=function(r:any){}, errorFn:any=function(r:any){}) {

		this.http.get(path)
			.map((res:any) => { return res.ok && res._body == '' ? null : res.json(); })
			.catch((error:any) => Observable.throw(error.json().Message || 'Server error'))
			.subscribe(res => { successFn(res) }, error => { errorFn(error) });

	}

	delete(path:string, vars:any, successFn:any=function(r:any){}, errorFn:any=function(r:any){}) {

		this.http.delete(path, vars)
			.map((res:any) => { return res.ok && res._body == '' ? null : res.json(); })
			.catch((error:any) => Observable.throw(error.json().Message || 'Server error'))
			.subscribe(res => { successFn(res) }, error => { errorFn(error) });

	}

}
