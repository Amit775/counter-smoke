import { patchState, signalStoreFeature, withMethods, withState } from '@ngrx/signals';

export type LabelsState = {
	labels: Record<string, true>;
};

export function withLabelsFeature() {
	return signalStoreFeature(
		withState<LabelsState>(() => ({ labels: {} })),
		withMethods(store => ({
			setLabels: (labels: Record<string, true>) => {
				patchState(store, state => ({ ...state, labels }));
			},
			toggleLabel: (label: string, value: boolean) => {
				patchState(store, state => {
					const { [label]: labelValue, ...others } = state.labels;
					return {
						...state,
						labels: { ...(value ? { [label]: labelValue } : {}), ...others },
					};
				});
			},
		}))
	);
}
