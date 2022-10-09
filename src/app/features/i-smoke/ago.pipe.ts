import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'ago', standalone: true })
export class AgoPipe implements PipeTransform {
	transform(value: string | undefined | null): string {
		if (!value) return '';
		if (/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(value) === false) return '';

		const currentTime = new Date();
		const [hours, minutes] = value.split(':').map(Number);
		const [cHours, cMinutes] = [currentTime.getHours(), currentTime.getMinutes()];
		let diffHours = cHours - hours;
		let diffMins = cMinutes - minutes;
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