import { patchState, signalStoreFeature, withMethods, withState } from '@ngrx/signals';

export type ShortcutState = {
	isFromShortcut: boolean;
	label: string | undefined;
};

export function withShortcutFeature() {
	return signalStoreFeature(
		withState<{ shortcut: ShortcutState }>(() => ({
			shortcut: { isFromShortcut: false, label: undefined },
		})),
		withMethods(store => ({
			setShortcut: (value: boolean, label?: string) => {
				patchState(store, state => ({
					...state,
					shortcut: { isFromShortcut: value, label: value ? label : undefined },
				}));
			},
		}))
	);
}
