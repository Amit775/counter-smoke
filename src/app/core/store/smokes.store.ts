import { Injectable } from "@angular/core";
import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";

export interface ISmoke {
    id: string;
    timestamp: number;
}

export interface SmokesState extends EntityState<ISmoke, string> { };

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'smokes' })
export class SmokesStore extends EntityStore<SmokesState> {

}