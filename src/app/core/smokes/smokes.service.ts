import { Injectable } from '@angular/core';
import { TeardownLogic } from 'rxjs';
import { ApiService } from '../api.service';
import { SmokesQuery } from './smokes.query';
import { ISmoke, ISmoker, SmokeContent, SmokesStore } from './smokes.store';

function withoutId<S, T extends S & { id: any }>(obj: T): S {
	delete obj.id;
	return obj;
}

@Injectable({ providedIn: 'root' })
export class SmokesService {
	constructor(
		private api: ApiService,
		private store: SmokesStore,
		private query: SmokesQuery
	) { }

	inc(): void {
		const smokerId = this.query.getSmokerId();
		const smoke: SmokeContent = { timestamp: Date.now(), labels: { label: true } };
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
		return this.api.sync(smokerId, {
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
				this.store.update(smoke.id, smoke);
				this.store.setLoading(false);
			},
		});
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
}
