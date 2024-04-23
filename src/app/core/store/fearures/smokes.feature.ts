import { computed } from '@angular/core';
import { patchState, signalStoreFeature, type, withComputed, withMethods } from '@ngrx/signals';
import {
	addEntity,
	removeEntity,
	setAllEntities,
	updateEntity,
	withEntities,
} from '@ngrx/signals/entities';
import { ISmoke } from 'src/app/models/smoke';
import { today } from 'src/app/utils/today';
import { setEvent, withEventFeature } from './event.feature';

export function withSmokesFeature() {
	return signalStoreFeature(
		withEventFeature<ISmoke>(),
		withEntities({ entity: type<ISmoke>(), collection: 'smokes' }),
		withComputed(state => ({
			countToday: computed(
				() => state.smokesEntities().filter(smoke => today(smoke.timestamp)).length
			),
			lastCigarette: computed(
				() => state.smokesEntities().sort((a, b) => b.timestamp - a.timestamp)[0]?.timestamp
			),
		})),
		withMethods(store => ({
			setSmokes(smokes: ISmoke[]): void {
				patchState(
					store,
					setAllEntities(smokes, { collection: 'smokes' }),
					setEvent('add', smokes)
				);
			},
			addSmoke(smoke: ISmoke): void {
				patchState(
					store,
					addEntity(smoke, { collection: 'smokes' }),
					setEvent('add', [smoke])
				);
			},
			updateSmoke(smoke: ISmoke): void {
				patchState(
					store,
					updateEntity({ id: smoke.id, changes: smoke }, { collection: 'smokes' }),
					setEvent('update', [smoke])
				);
			},
			removeSmoke(smoke: ISmoke): void {
				patchState(
					store,
					removeEntity(smoke.id, { collection: 'smokes' }),
					setEvent('remove', [smoke])
				);
			},
		}))
	);
}
