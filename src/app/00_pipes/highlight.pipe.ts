
import { Pipe } from '@angular/core';

@Pipe({ name: 'highlight' })

export class highlightPipe {

	transform(str:string, regex?:string, flags:string='gim') {

		if(!regex) { return str; }
		if(flags === '') { flags = ''; } else if(!flags) { flags = 'gim'; }

		var r:RegExp = new RegExp(regex, flags);
		return str.replace(r, match => `<strong>${match}</strong>`);

	}

}
