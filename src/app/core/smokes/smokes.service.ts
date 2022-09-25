import { Injectable } from '@angular/core';
import { TeardownLogic } from 'rxjs';
import { ApiService } from '../api.service';
import { SmokesQuery } from './smokes.query';
import { ISmoke, ISmoker, SmokeContent, SmokesStore } from './smokes.store';

export function DToList(smokes: { [id: string]: SmokeContent }): ISmoke[] {
	return Object.entries(smokes).map(
		([id, smoke]) => ({ id, ...smoke } as ISmoke)
	);
}

export function withoutId<S, T extends S & { id: any }>(obj: T): S {
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
		const smoker = this.query.getSmoker();
		const smoke: SmokeContent = { timestamp: Date.now() };
		this.store.setLoading(true);
		this.api.newSmoke(smoker.id, smoke);
	}

	reset(): void {
		const smoker = this.query.getSmoker();
		this.api.reset(smoker.id);
	}

	syncData(): TeardownLogic {
		const smoker = this.query.getSmoker();
		this.store.setLoading(true);
		return this.api.sync(smoker.id, {
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
		const smoker = this.query.getSmoker();
		this.store.setLoading(true);
		this.api.updateSmoke(smoker.id, smoke.id, withoutId(smoke));
	}

	removeSmoke(smoke: ISmoke): void {
		const smoker = this.query.getSmoker();
		this.store.setLoading(true);
		this.api.removeSmoke(smoker.id, smoke.id);
	}

	setIsInitialized(): void {
		this.store.update({ isInitialized: true });
	}

	setSmoker(smoker: ISmoker): void {
		this.store.update({ smoker });
	}
}
