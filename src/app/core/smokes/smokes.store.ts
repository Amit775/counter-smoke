import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { WithId } from 'src/app/utils/with-id.type';

export type ISmoker = {
	id: string;
};
export type SmokeContent = {
	timestamp: number;
	labels: Record<string, true>;
	id?: string;
};

export type ISmoke = WithId<SmokeContent>;

export type AppState = {
	isInitialized: boolean;
	isLoading: boolean;
	smoker: ISmoker | undefined;
};

export type ShortcutState = {
	isFromShortcut: boolean;
	label: string | undefined;
};

export type SmokesState = {
	smokes: Record<string, ISmoke>;
};

export type LabelsState = {
	labels: Record<string, true>;
};

export type EventState = {
	name: string;
	payload: ISmoke[];
};

export type State = AppState & SmokesState & LabelsState & ShortcutState & EventState;

export const createEmptySmoke = (timestamp: number = Date.now()): SmokeContent => ({ timestamp, labels: {} });

export const today = (smoke: ISmoke, index?: number | undefined) => {
	const smokeDate = new Date(smoke.timestamp).setHours(0, 0, 0, 0);
	const todayDate = new Date().setHours(0, 0, 0, 0);
	return smokeDate === todayDate;
};

export const SmokesStore = signalStore(
	{ providedIn: 'root' },
	withState<AppState>(() => ({ isInitialized: false, isLoading: false, smoker: undefined })),
	withState<SmokesState>(() => ({ smokes: {} })),
	withState<LabelsState>(() => ({ labels: {} })),
	withState<{ event: EventState | undefined }>(() => ({ event: undefined })),
	withState<{ shortcut: ShortcutState }>(() => ({ shortcut: { isFromShortcut: false, label: undefined } })),
	withComputed(state => ({
		smokerId: computed(() => state.smoker()?.id),
		countToday: computed(() => Object.values(state.smokes()).filter(today).length),
		lastCigarette: computed(
			() => Object.values(state.smokes()).sort((a, b) => a.timestamp - b.timestamp)[0]?.timestamp
		),
	})),
	withMethods(store => ({
		setShortcut(value: boolean, label?: string): void {
			patchState(store, state => ({
				...state,
				shortcut: { isFromShortcut: value, label: value ? label : undefined },
			}));
		},
		setLoading(value: boolean): void {
			patchState(store, state => ({ ...state, isLoading: value }));
		},
		setIsInitialized(): void {
			patchState(store, state => ({ ...state, isInitialized: true }));
		},
		setSmoker(smoker: ISmoker): void {
			patchState(store, state => ({ ...state, smoker }));
		},
		setSmokes(smokes: ISmoke[]): void {
			patchState(store, state => ({
				...state,
				smokes: smokes.reduce((result, smoke) => ({ ...result, [smoke.id]: smoke }), {}),
				event: { name: 'add', payload: smokes },
			}));
		},
		setLabels(labels: Record<string, true>): void {
			patchState(store, state => ({ ...state, labels }));
		},
		toggleLabel(label: string, value: boolean): void {
			patchState(store, state => {
				const { [label]: labelValue, ...others } = state.labels;
				return { ...state, labels: { ...(value ? { [label]: labelValue } : {}), ...others } };
			});
		},
		addSmoke(smoke: ISmoke): void {
			patchState(store, state => ({
				...state,
				smokes: { ...state.smokes, [smoke.id]: smoke },
				event: { name: 'add', payload: [smoke] },
			}));
		},
		updateSmoke(smoke: ISmoke): void {
			patchState(store, state => ({
				...state,
				smokes: { ...state.smokes, [smoke.id]: smoke },
				event: { name: 'update', payload: [smoke] },
			}));
		},
		removeSmoke(smoke: ISmoke): void {
			patchState(store, state => {
				const { [smoke.id]: _, ...smokes } = state.smokes;
				return { ...state, smokes, event: { name: 'remove', payload: [smoke] } };
			});
		},
	}))
);
