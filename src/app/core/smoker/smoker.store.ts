import { Injectable } from "@angular/core";
import { Store, StoreConfig } from "@datorama/akita";

export interface ISmoker {
    id: string;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'smoker' })
export class SmokerStore extends Store<ISmoker> {
    constructor() { super({}) }
}