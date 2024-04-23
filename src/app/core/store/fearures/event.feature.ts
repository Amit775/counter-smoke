import { patchState, signalStoreFeature, withMethods, withState } from '@ngrx/signals';
import { EventState } from 'src/app/models/event';

export function clearEvent<T>() {
	return { event: undefined };
}

export function setEvent<T>(name: string, payload: T) {
	return { event: { name, payload } };
}

export function withEventFeature<T>() {
	return signalStoreFeature(
		withState<{ event: EventState<T[]> | undefined }>(() => ({ event: undefined })),
		withMethods(store => ({
			setEvent(name: string, payload: T[]) {
				patchState(store, setEvent(name, payload));
			},
		}))
	);
}
