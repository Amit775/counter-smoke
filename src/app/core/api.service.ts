import { Inject, Injectable } from '@angular/core';
import { Database, onValue, ref, set, Unsubscribe } from '@firebase/database';
import {
	onChildAdded,
	onChildChanged,
	onChildRemoved,
	push,
	update
} from 'firebase/database';
import { FIREBASE_DB } from './firebase.app';
import { ISmoke, SmokeContent } from './smokes/smokes.store';

function DToList(smokes: { [id: string]: SmokeContent }): ISmoke[] {
	return Object.entries(smokes).map(
		([id, smoke]) => ({ id, ...smoke } as ISmoke)
	);
}

interface IListeners<T> {
	onAdd?: (item: T) => void;
	onUpdate?: (item: T) => void;
	onRemove?: (item: T) => void;
	getAll?: (items: T[]) => void;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
	constructor(@Inject(FIREBASE_DB) private db: Database) { }

	newSmoke(smokerId: string, smoke: SmokeContent): void {
		const refs = ref(this.db, `smokers/${smokerId}/smokes`);
		push(refs, smoke);
	}

	updateSmoke(smokerId: string, smokeId: string, smoke: SmokeContent): void {
		const refs = ref(this.db, `smokers/${smokerId}/smokes/${smokeId}/`);
		update(refs, smoke);
	}

	removeSmoke(smokerId: string, smokeId: string): void {
		const refs = ref(this.db, `smokers/${smokerId}/smokes/${smokeId}/`);
		set(refs, null);
	}

	sync(smokerId: string, listeners: IListeners<ISmoke>): Unsubscribe {
		const refs = ref(this.db, `smokers/${smokerId}/smokes`);

		const subs = [
			listeners.onAdd
				? onChildAdded(refs, (s) => listeners.onAdd!({ id: s.key, ...s.val() }))
				: () => { },
			listeners.onUpdate
				? onChildChanged(refs, (s) => listeners.onUpdate!({ id: s.key, ...s.val() }))
				: () => { },
			listeners.onRemove
				? onChildRemoved(refs, (s) => listeners.onRemove!({ id: s.key, ...s.val() }))
				: () => { },
			listeners.getAll
				? onValue(refs, (s) => listeners.getAll!(DToList(s.val() ?? {})), { onlyOnce: true, })
				: () => { },
		];

		return () => subs.forEach((sub) => sub());
	}

	reset(smokerId: string): void {
		const refs = ref(this.db, `smokers/${smokerId}/smokes`);
		set(refs, null);
	}
}
