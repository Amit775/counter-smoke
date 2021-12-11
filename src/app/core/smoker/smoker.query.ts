import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { map, Observable } from "rxjs";
import { ISmoker, SmokerStore } from "./smoker.store";

@Injectable({ providedIn: 'root' })
export class SmokerQuery extends Query<ISmoker> {
    constructor(protected override store: SmokerStore) { super(store); }

    getIsLoggedIn(): boolean {
        return this.getValue().id != null;
    }

    selectIsLoggedIn(): Observable<boolean> {
        return this.select().pipe(map(smoker => smoker.id != null));
    }
}