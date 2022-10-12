import { Inject, Injectable } from '@angular/core';
import { Database, onValue, ref, set, Unsubscribe } from '@firebase/database';
import {
	DatabaseReference,
	onChildAdded,
	onChildChanged,
	onChildRemoved,
	push, update
} from 'firebase/database';
import { FIREBASE_DB } from './firebase.app';
import { ISmoke, SmokeContent } from './smokes/smokes.store';

type WithId<T> = T & { id: string };

function DToList<T>(smokes: { [id: string]: T }): WithId<T>[] {
	return Object.entries(smokes).map(
		([id, smoke]) => ({ id, ...smoke } as WithId<T>)
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

	syncSmokes(smokerId: string, listeners: IListeners<ISmoke>): Unsubscribe {
		const refs = ref(this.db, `smokers/${smokerId}/smokes`);
		return this.listenToRefChanges(refs, listeners);
	}

	syncLabels(smokerId: string, listeners: IListeners<string[]>): Unsubscribe {
		const refs = ref(this.db, `smokers/${smokerId}/labels`);
		return this.listenToRefChanges(refs, listeners);
	}

	reset(smokerId: string): void {
		const refs = ref(this.db, `smokers/${smokerId}/smokes`);
		set(refs, null);
	}

	private listenToRefChanges<T>(ref: DatabaseReference, listeners: IListeners<T>): Unsubscribe {
		const subs = [
			listeners.onAdd
				? onChildAdded(ref, (s) => listeners.onAdd!({ id: s.key, ...s.val() }))
				: () => { },
			listeners.onUpdate
				? onChildChanged(ref, (s) => listeners.onUpdate!({ id: s.key, ...s.val() }))
				: () => { },
			listeners.onRemove
				? onChildRemoved(ref, (s) => listeners.onRemove!({ id: s.key, ...s.val() }))
				: () => { },
			listeners.getAll
				? onValue(ref, (s) => listeners.getAll!(DToList(s.val() ?? {})), { onlyOnce: true })
				: () => { },
		];

		return () => subs.forEach((sub) => sub());
	}
}
