import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'sort' })
export class SortPipe<T> implements PipeTransform {
	public transform(value: T[], by: (item: T) => number = (item: T) => 0, order: 'ASC' | 'DESC' = 'ASC'): T[] {
		console.log(value, by, order);
		const sortOrder = (order === 'ASC' ? -1 : 1);
		const result = value.slice().sort((a, b) =>  {
			console.log(a, b, by(a), by(b))
			return sortOrder * (by(a) - by(b))
		});
		console.log(result)

		return result;
	}
}