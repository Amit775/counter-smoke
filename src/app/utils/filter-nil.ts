import { Observable, OperatorFunction, filter } from 'rxjs';

export const filterNil = <T>(): OperatorFunction<T | null | undefined, T> => {
	return (source: Observable<T | null | undefined>) =>
		source.pipe(filter(value => Boolean(value))) as Observable<T>;
};
