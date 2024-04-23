import { Pipe, PipeTransform } from '@angular/core';


const MINUTE_IN_MS = 1000 * 60;
const HOUR_IN_MS = MINUTE_IN_MS * 60;
const HOUR_IN_MINUTES = HOUR_IN_MS / MINUTE_IN_MS;
const DAY_IN_MS = HOUR_IN_MS * 24;

@Pipe({ name: 'ago', standalone: true })
export class AgoPipe implements PipeTransform {
	transform(diffTime: number | undefined | null): string {
		if (diffTime == null) return '';

		if (diffTime > DAY_IN_MS) return 'more than a day ago';

		const diffInMinutes = Math.floor(diffTime / MINUTE_IN_MS);
		const diffHours = Math.floor(diffInMinutes / HOUR_IN_MINUTES);
		const diffMins = Math.floor(diffInMinutes % HOUR_IN_MINUTES);

		if (diffHours === 0 && diffMins === 0) return 'just now';

		const a = (num: number) => (num === 1 ? 'a ' : '');
		const s = (num: number) => (num === 1 ? '' : 's');

		const hoursAgo = diffHours > 0 ? `${a(diffHours)}${diffHours} hour${s(diffHours)}` : '';
		const minutsAgo = diffMins > 0 ? `${a(diffMins)}${diffMins} minute${s(diffMins)}` : '';
		const and = diffHours > 0 && diffMins > 0 ? ' and ' : '';

		return `${hoursAgo}${and}${minutsAgo} ago`;
	}
}
