import { Injectable, inject } from '@angular/core';
import { listToRecordAsKeys } from 'src/app/utils/list-to-record';
import { withoutId } from 'src/app/utils/without-id';
import { ApiService } from '../api.service';
import { SmokesQuery } from './smokes.query';
import { ISmoke, ISmoker, SmokeContent, SmokesStore } from './smokes.store';

@Injectable({ providedIn: 'root' })
export class SmokesService {
	private api: ApiService = inject(ApiService);
	private store: SmokesStore = inject(SmokesStore);
	private query: SmokesQuery = inject(SmokesQuery);

	setShortcut(value: boolean, label?: string): void {
		this.store.update({
			shortcut: {
				isFromShortcut: value,
				label: value ? label : undefined,
			},
		});
	}

	addSmokeNow(labels: Record<string, true> = {}): void {
		this.addSmoke({ labels, timestamp: Date.now() });
	}

	addSmoke(smoke: SmokeContent): void {
		const smokerId = this.query.getSmokerId();
		this.store.setLoading(true);
		this.api.createSmoke(smokerId, smoke);
	}

	reset(): void {
		const smokerId = this.query.getSmokerId();
		this.api.reset(smokerId);
	}

	syncData(smokerId: string): () => void {
		this.store.setLoading(true);
		const subSmokes = this.syncSmokes(smokerId);
		const subLabels = this.syncLabels(smokerId);
		return () => [subSmokes, subLabels].forEach(sub => sub());
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

	addLabelOptions(labels: string[]): void {
		return this.api.addLabels(this.query.getSmokerId(), labels);
	}

	removeLabelOptions(labels: string[]): void {
		return this.api.removeLabels(this.query.getSmokerId(), labels);
	}

	setIsInitialized(): void {
		this.store.update({ isInitialized: true });
	}

	setSmoker(smoker: ISmoker): void {
		this.store.update({ smoker });
	}

	private syncSmokes(smokerId: string): () => void {
		return this.api.syncSmokes(smokerId, {
			getAll: smokes => {
				this.store.set(smokes);
				this.store.setLoading(false);
			},
			onAdd: smoke => {
				this.store.add(smoke);
				this.store.setLoading(false);
			},
			onRemove: smoke => {
				this.store.remove(smoke.id);
				this.store.setLoading(false);
			},
			onUpdate: smoke => {
				this.store.replace(smoke.id, smoke);
				this.store.setLoading(false);
			},
		});
	}

	private syncLabels(smokerId: string): () => void {
		return this.api.syncLabels(smokerId, {
			getAll: labels => {
				this.store.update(state => ({
					...state,
					labels: listToRecordAsKeys(
						labels.map(l => l.id),
						true
					),
				}));
				this.store.setLoading(false);
			},
			onAdd: label => {
				this.store.update(state => ({
					...state,
					labels: this.toggleLabel(state.labels, label.id, true),
				}));
				this.store.setLoading(false);
			},
			onRemove: label => {
				this.store.update(state => ({
					...state,
					labels: this.toggleLabel(state.labels, label.id, false),
				}));
				this.store.setLoading(false);
			},
		});
	}

	private toggleLabel(labels: Record<string, true>, label: string, value: boolean): Record<string, true> {
		const { [label]: updated, ...others } = labels ?? {};
		const result = value ? ({ ...labels, [label]: true } as Record<string, true>) : others;
		return result;
	}
}
