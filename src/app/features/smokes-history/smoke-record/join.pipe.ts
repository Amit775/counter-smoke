import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'join' })
export class JoinPipe<T> implements PipeTransform {
	transform(value: T[] | Record<string, any>): string {
		if (!value) return '';
		const values: string[] = Array.isArray(value) ? value : Object.keys(value);
		return values.join(', ');
	}
}
