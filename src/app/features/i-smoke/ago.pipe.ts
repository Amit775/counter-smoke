import { Pipe, PipeTransform } from "@angular/core";

const minuteInMs = 1000 * 60;
const hourInMs = minuteInMs * 60;
const hourInMins = hourInMs / minuteInMs;
const dayInMs = hourInMs * 24;

@Pipe({ name: 'ago', standalone: true })
export class AgoPipe implements PipeTransform {
	transform(value: number | undefined | null): string {
		if (!value) return '';

		const currentTime = new Date();
		const smokeTime = new Date(value);
		const diffTime = currentTime.valueOf() - smokeTime.valueOf();

		if (diffTime > dayInMs) return 'more than a day ago';

		const diffInMinutes = Math.floor(diffTime / minuteInMs);
		const diffHours = Math.floor(diffInMinutes /  hourInMins);
		const diffMins = Math.floor(diffInMinutes % hourInMins);

		if (diffHours === 0 && diffMins === 0) return 'just now';

		const a = (num: number) => num === 1 ? 'a ' : '';
		const s = (num: number) => num === 1 ? '' : 's';

		const hoursAgo = diffHours > 0 ? `${a(diffHours)}${diffHours} hour${s(diffHours)}` : '';
		const minutsAgo = diffMins > 0 ? `${a(diffMins)}${diffMins} minute${s(diffMins)}` : '';
		const and = diffHours > 0 && diffMins > 0 ? ' and ' : '';

		return `${hoursAgo}${and}${minutsAgo} ago`;


	}
}