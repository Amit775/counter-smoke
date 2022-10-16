import { Injectable } from '@angular/core';
import { TeardownLogic } from 'rxjs';
import { listToRecordAsKeys } from 'src/app/utils/list-to-record';
import { withoutId } from 'src/app/utils/without-id';
import { ApiService } from '../api.service';
import { SmokesQuery } from './smokes.query';
import { ISmoke, ISmoker, SmokeContent, SmokesStore } from './smokes.store';

@Injectable({ providedIn: 'root' })
export class SmokesService {
	constructor(
		private api: ApiService,
		private store: SmokesStore,
		private query: SmokesQuery
	) { }

	inc(labels: Record<string, true> = {}): void {
		const smokerId = this.query.getSmokerId();

		const smoke: SmokeContent = { timestamp: Date.now(), labels: labels };
		this.store.setLoading(true);
		this.api.newSmoke(smokerId, smoke);
	}

	reset(): void {
		const smokerId = this.query.getSmokerId();
		this.api.reset(smokerId);
	}

	syncData(): TeardownLogic {
		const smokerId = this.query.getSmokerId();
		this.store.setLoading(true);
		const subSmokes = this.syncSmokes(smokerId);
	}

	updateSmoke(smoke: ISmoke): void {
		const smokerId = this.query.getSmokerId();
		this.store.setLoading(true);
		this.api.updateSmoke(smokerId, smoke.id, withoutId(smoke));
	}

	removeSmoke(smoke: ISmoke): void {
		const smokerId = this.query.getSmokerId();
		this.store.setLoading(true);
		this.api.removeSmoke(smokerId, smoke.id);
	}

	setIsInitialized(): void {
		this.store.update({ isInitialized: true });
	}

	setSmoker(smoker: ISmoker): void {
		this.store.update({ smoker });
	}

	private syncSmokes(smokerId: string): TeardownLogic {
		return this.api.syncSmokes(smokerId, {
			getAll: (smokes) => {
				this.store.set(smokes);
				this.store.setLoading(false);
			},
			onAdd: (smoke) => {
				this.store.add(smoke);
				this.store.setLoading(false);
			},
			onRemove: (smoke) => {
				this.store.remove(smoke.id);
				this.store.setLoading(false);
			},
			onUpdate: (smoke) => {
				this.store.replace(smoke.id, smoke);
				this.store.setLoading(false);
			},
		});
	}

	private syncLabels(smokerId: string): TeardownLogic {
		return this.api.syncLabels(smokerId, {
			getAll: (labels) => {
				this.store.update(state => state.labels = listToRecordAsKeys(labels, true))
				this.store.setLoading(false);
			},
			onAdd: (label) => {
				this.store.update(state => ({
					...state,
					labels: this.toggleLabel(state.labels, label, true)
				}));
				this.store.setLoading(false);
			},
			onRemove: (label) => {
				this.store.update(state => ({
					...state,
					labels: this.toggleLabel(state.labels, label, false)
				}));
				this.store.setLoading(false);
			}
		});
	}

	private toggleLabel(labels: Record<string, true>, label: string, value: boolean): Record<string, true> {
		const { [label]: updated, ...others } = labels;
		return value ? { ...labels, [label]: true } : others;
	}
}
