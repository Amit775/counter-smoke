import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { Observable } from "rxjs";
import { ISmoke, SmokesState, SmokesStore } from "./smokes.store";

export const today = (smoke: ISmoke, index?: number | undefined) => {
    const smokeDate = new Date(smoke.timestamp).setHours(0, 0, 0, 0);
    const todayDate = new Date().setHours(0, 0, 0, 0);
    return smokeDate === todayDate;
}

@Injectable({ providedIn: 'root' })
export class SmokesQuery extends QueryEntity<SmokesState> {
    constructor(protected override store: SmokesStore) { super(store); }

    selectCountToday(): Observable<number> {
        return this.selectCount(today);
    }

    getCountToday(): number {
        return this.getCount(today);
    }
}