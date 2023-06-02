import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
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

export const createEmptySmoke = (timestamp: number = Date.now()): SmokeContent => ({ timestamp, labels: {} });

export interface SmokesState extends EntityState<ISmoke, string> {
	isInitialized: boolean;
	smoker: ISmoker;
	labels: Record<string, true>;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'smokes' })
export class SmokesStore extends EntityStore<SmokesState> {
	constructor() {
		super({ isInitialized: false, labels: {} });
	}
}
