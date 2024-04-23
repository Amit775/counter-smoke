import { computed } from '@angular/core';
import {
	patchState,
	signalStoreFeature,
	withComputed,
	withMethods,
	withState,
} from '@ngrx/signals';
import { ISmoker } from 'src/app/models/smoker';

export function withSmokerFeature() {
	return signalStoreFeature(
		withState<{ smoker: ISmoker | undefined }>(() => ({ smoker: undefined })),
		withMethods(store => ({
			setSmoker(smoker: ISmoker): void {
				patchState(store, state => ({ ...state, smoker }));
			},
		})),
		withComputed(state => ({
			smokerId: computed(() => state.smoker()?.id),
		}))
	);
}
