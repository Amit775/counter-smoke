import { Injectable } from '@angular/core';
import { Order, QueryEntity } from '@datorama/akita';
import { map, Observable } from 'rxjs';
import { ISmoke, SmokesState, SmokesStore } from './smokes.store';

export const today = (smoke: ISmoke, index?: number | undefined) => {
	const smokeDate = new Date(smoke.timestamp).setHours(0, 0, 0, 0);
	const todayDate = new Date().setHours(0, 0, 0, 0);
	return smokeDate === todayDate;
};

@Injectable({ providedIn: 'root' })
export class SmokesQuery extends QueryEntity<SmokesState> {
	constructor(store: SmokesStore) {
		super(store);
	}

	getSmokerId(): string {
		return this.getValue().smoker!.id;
	}

	selectCountToday(): Observable<number> {
		return this.selectCount(today);
	}

	selectSmokesAtDate(date: Date): Observable<ISmoke[]> {
		return this.selectAll({
			filterBy: smoke => new Date(smoke.timestamp).setHours(0, 0, 0, 0) === date.valueOf(),
			sortBy: 'timestamp',
		});
	}

	selectLastCigarete(): Observable<number> {
		return this.selectAll({ sortBy: 'timestamp', sortByOrder: Order.DESC, limitTo: 1 }).pipe(
			map((lastCigarete: ISmoke[]) => lastCigarete?.[0]?.timestamp)
		);
	}
}
