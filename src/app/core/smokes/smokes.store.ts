import { Injectable } from "@angular/core";
import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";

export type ISmoker = {
	id: string;
}

export type SmokeContent = {
	timestamp: number;
	labels: Record<string, string>;
}

export type ISmoke = {
	id: string;
} & SmokeContent;

export interface SmokesState extends EntityState<ISmoke, string> {
	isInitialized: boolean;
	smoker: ISmoker,
	labels: Record<string, string>;
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'smokes' })
export class SmokesStore extends EntityStore<SmokesState> {
	constructor() { super({ isInitialized: false }) }
}