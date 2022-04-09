import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { map, Observable } from "rxjs";
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

    selectByDates(): Observable<{ [date: number]: ISmoke[]}> {
        return this.selectAll().pipe(map(smokes => {
			const result: { [date: number]: ISmoke[] } = {};
			smokes.forEach(smoke => {
				const date = new Date(smoke.timestamp).setHours(0, 0, 0, 0);
				result[date] = [...result[date] ?? [], smoke]
			})
			return result;
		}));
    }
}