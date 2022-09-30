import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { map, Observable } from "rxjs";
import { ISmoke, ISmoker, SmokesState, SmokesStore } from "./smokes.store";

export const today = (smoke: ISmoke, index?: number | undefined) => {
	const smokeDate = new Date(smoke.timestamp).setHours(0, 0, 0, 0);
	const todayDate = new Date().setHours(0, 0, 0, 0);
	return smokeDate === todayDate;
}

@Injectable({ providedIn: 'root' })
export class SmokesQuery extends QueryEntity<SmokesState> {
	constructor(protected override store: SmokesStore) { super(store); }

	getSmoker(): ISmoker {
		return this.getValue().smoker;
	}

	selectCountToday(): Observable<number> {
		return this.selectCount(today);
	}

	selectSmokesAtDate(date: Date): Observable<ISmoke[]> {
		return this.selectAll({ filterBy: (smoke) => new Date(smoke.timestamp).setHours(0, 0, 0, 0) === date.valueOf() });
	}

	getCountToday(): number {
		return this.getCount(today);
	}

	selectByDates(): Observable<{ date: number; smokes: ISmoke[] }[]> {
		return this.selectAll().pipe(map(smokes => {
			const result: { [date: number]: ISmoke[] } = {};
			smokes.slice().reverse().forEach(smoke => {
				const date = new Date(smoke.timestamp).setHours(0, 0, 0, 0);
				result[date] = [...result[date] ?? [], smoke]
			})
			return Object.keys(result).reduce((arr, date) => {
				arr.push({ date: +date, smokes: result[+date] })
				return arr;
			}, [] as { date: number; smokes: ISmoke[] }[]);
		}));
	}

	getCountByDates(): Record<number, number> {
		return this.getAll().reduce((result: Record<number, number>, smoke: ISmoke) => {
			const date = new Date(smoke.timestamp).setHours(0, 0, 0, 0);
			result[date] = (result[date] ?? 0) + 1;
			return result;
		}, {})
	}
}