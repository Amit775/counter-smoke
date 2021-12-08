import { Injectable } from "@angular/core";
import { ISmoker, SmokerStore } from "./store/smoker.store";

@Injectable({ providedIn: 'root' })
export class SmokerService {
    constructor(private store: SmokerStore) { }

    public getCurrentSmoker(): ISmoker {
        return this.store.getValue();
    }
}