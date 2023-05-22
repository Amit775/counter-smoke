import { MonoTypeOperatorFunction, Observable, tap } from 'rxjs';

export function debug<T>(name: string): MonoTypeOperatorFunction<T> {
	return (soure: Observable<T>) =>
		soure.pipe(
			tap({
				next: (value: T) => console.log(`${name}: VALUE`, value),
				error: error => console.log(`${name}: ERROR`, error),
				complete: () => console.log(`${name}: COMPLETE`),
			})
		);
}
