import { Injectable, inject } from '@angular/core';
import { listToRecordAsKeys } from 'src/app/utils/list-to-record';
import { withoutId } from 'src/app/utils/without-id';
import { ApiService } from '../api.service';
import { ISmoke, ISmoker, SmokeContent, SmokesStore } from './smokes.store';

@Injectable({ providedIn: 'root' })
export class SmokesService {
	private api: ApiService = inject(ApiService);
	private store = inject(SmokesStore);

	setShortcut(value: boolean, label?: string): void {
		this.store.setShortcut(value, label);
	}

	addSmokeNow(labels: Record<string, true> = {}): void {
		this.addSmoke({ labels, timestamp: Date.now() });
	}

	addSmoke(smoke: SmokeContent): void {
		const smokerId = this.store.smokerId();
		if (!smokerId) return;

		this.store.setLoading(true);
		this.api.createSmoke(smokerId, smoke);
	}

	reset(): void {
		const smokerId = this.store.smokerId();
		if (!smokerId) return;

		this.api.reset(smokerId);
	}

	syncData(smokerId: string): () => void {
		this.store.setLoading(true);
		const subSmokes = this.syncSmokes(smokerId);
		const subLabels = this.syncLabels(smokerId);
		return () => [subSmokes, subLabels].forEach(sub => sub());
	}

	updateSmoke(smoke: ISmoke): void {
		const smokerId = this.store.smokerId();
		if (!smokerId) return;

		this.store.setLoading(true);
		this.api.updateSmoke(smokerId, smoke.id, withoutId(smoke));
	}

	removeSmoke(smoke: ISmoke): void {
		const smokerId = this.store.smokerId();
		if (!smokerId) return;

		this.store.setLoading(true);
		this.api.removeSmoke(smokerId, smoke.id);
	}

	addLabelOptions(labels: string[]): void {
		const smokerId = this.store.smokerId();
		if (!smokerId) return;

		return this.api.addLabels(smokerId, labels);
	}

	removeLabelOptions(labels: string[]): void {
		const smokerId = this.store.smokerId();
		if (!smokerId) return;

		return this.api.removeLabels(smokerId, labels);
	}

	setIsInitialized(): void {
		this.store.setIsInitialized();
	}

	setSmoker(smoker: ISmoker): void {
		this.store.setSmoker(smoker);
	}

	private syncSmokes(smokerId: string): () => void {
		return this.api.syncSmokes(smokerId, {
			getAll: smokes => {
				this.store.setSmokes(smokes);
				this.store.setLoading(false);
			},
			onAdd: smoke => {
				this.store.addSmoke(smoke);
				this.store.setLoading(false);
			},
			onRemove: smoke => {
				this.store.removeSmoke(smoke);
				this.store.setLoading(false);
			},
			onUpdate: smoke => {
				this.store.updateSmoke(smoke);
				this.store.setLoading(false);
			},
		});
	}

	private syncLabels(smokerId: string): () => void {
		return this.api.syncLabels(smokerId, {
			getAll: labels => {
				this.store.setLabels(
					listToRecordAsKeys(
						labels.map(l => l.id),
						true
					)
				);
				this.store.setLoading(false);
			},
			onAdd: label => {
				this.store.toggleLabel(label.id, true);
				this.store.setLoading(false);
			},
			onRemove: label => {
				this.store.toggleLabel(label.id, false);
				this.store.setLoading(false);
			},
		});
	}
}
