
import { Pipe } from '@angular/core';

@Pipe({ name: 'noHTML' })

export class noHtmlPipe {

	transform(str:string) {

		return str
			.replace(/&/g, '&amp;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#39;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;');

	}

}
