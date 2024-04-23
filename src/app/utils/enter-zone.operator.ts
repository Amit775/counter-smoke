import { NgZone, inject } from '@angular/core';
import { Observable, OperatorFunction } from 'rxjs';

export function enterZone<T>(ngZone?: NgZone): OperatorFunction<T, T> {
	const zone = ngZone ?? inject(NgZone);
	return source =>
		new Observable<T>(subscriber =>
			source.subscribe({
				next: (value: T) => zone?.run(() => subscriber.next(value)),
				error: (error: unknown) => zone?.run(() => subscriber.error(error)),
				complete: () => zone?.run(() => subscriber.complete()),
			})
		);
}
