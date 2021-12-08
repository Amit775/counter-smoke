import { Injectable } from "@angular/core";
import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";

export interface Smokes {
    [id: string]: SmokeContent
}
export interface SmokeContent {
    timestamp: number;
}

export interface ISmoke extends SmokeContent {
    id: string;
}

export interface SmokesState extends EntityState<ISmoke, string> { };

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'smokes' })
export class SmokesStore extends EntityStore<SmokesState> {

}