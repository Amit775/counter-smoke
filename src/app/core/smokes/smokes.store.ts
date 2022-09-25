import { Injectable } from "@angular/core";
import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";

export type ISmoker = {
	id: string;
}
export type Smokes = {
	[id: string]: SmokeContent
}
export type SmokeContent = {
	timestamp: number;
}
export type ISmoke = {
	id: string;
} & SmokeContent;

export interface SmokesState extends EntityState<ISmoke, string> {
	isInitialized: boolean;
	smoker: ISmoker
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'smokes' })
export class SmokesStore extends EntityStore<SmokesState> {
	constructor() { super({ isInitialized: false }) }
}