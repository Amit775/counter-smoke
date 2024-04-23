import { patchState, signalStoreFeature, withMethods, withState } from '@ngrx/signals';

export function withInitializedFeature() {
	return signalStoreFeature(
		withState(() => ({ isInitialized: false })),
		withMethods(store => ({
			setIsInitialized(): void {
				patchState(store, state => ({ ...state, isInitialized: true }));
			},
		}))
	);
}
