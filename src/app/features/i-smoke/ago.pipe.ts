import { Pipe, PipeTransform } from "@angular/core";

const dayInMs = 1000 * 60 * 60 * 24;
@Pipe({ name: 'ago', standalone: true })
export class AgoPipe implements PipeTransform {
	transform(value: number | undefined | null): string {
		if (!value) return '';

		const currentTime = new Date();
		const smokeTime = new Date(value);
		if (currentTime.valueOf() - smokeTime.valueOf() > dayInMs) return 'more then a day ago';

		const [cHours, cMinutes] = [currentTime.getHours(), currentTime.getMinutes()];
		const [sHours, sMinutes] = [smokeTime.getHours(), smokeTime.getMinutes()];
		let diffHours = cHours - sHours;
		let diffMins = cMinutes - sMinutes;
		if (diffMins < 0) {
			diffHours -= 1;
			diffMins += 60
		}

		if (diffHours === 0 && diffMins === 0) return 'just now';

		const a = (num: number) => num === 1 ? 'a ' : '';
		const s = (num: number) => num === 1 ? '' : 's';

		const hoursAgo = diffHours > 0 ? `${a(diffHours)}${diffHours} hour${s(diffHours)}` : '';
		const minutsAgo = diffMins > 0 ? `${a(diffMins)}${diffMins} minute${s(diffMins)}` : '';
		const and = diffHours > 0 && diffMins > 0 ? ' and ' : '';

		return `${hoursAgo}${and}${minutsAgo} ago`;


	}
}