import { signalStoreFeature, withState, withMethods, patchState } from "@ngrx/signals";

export function withLoadingFeature() {
	return signalStoreFeature(
		withState(() => ({ isLoading: false })),
		withMethods(store => ({
			setLoading: (value: boolean) => {
				patchState(store, state => ({ ...state, isLoading: value }));
			},
		}))
	);
}