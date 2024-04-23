import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'join', standalone: true })
export class JoinPipe<T> implements PipeTransform {
	transform(value: T[] | Record<string, any>, seperator: string = ', '): string {
		if (!value) return '';

		const values: string[] = Array.isArray(value) ? value : Object.keys(value);
		return values.join(seperator);
	}
}
