
import { Pipe } from '@angular/core';

@Pipe({ name: 'regex' })

export class regexPipe {

	transform(str:string) {

		str = '' + str;

		str = str.replace(/^\//, '');
		str = str.replace(/\/[gim]*$/, '');

		return str;

	}

}
