import { Injectable, inject } from '@angular/core';
import { Database, Unsubscribe, onValue, ref, set } from '@firebase/database';
import {
	DataSnapshot,
	DatabaseReference,
	onChildAdded,
	onChildChanged,
	onChildRemoved,
	push,
	update,
} from 'firebase/database';
import { ISmoke, SmokeContent } from '../models/smoke';
import { recordToList } from '../utils/record-to-list';
import { FIREBASE_DB } from './firebase.app';

interface IListeners<T> {
	onAdd?: (item: T) => void;
	onUpdate?: (item: T) => void;
	onRemove?: (item: T) => void;
	getAll?: (items: T[]) => void;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
	private db: Database = inject(FIREBASE_DB);

	createSmoke(smokerId: string, smoke: SmokeContent): void {
		const refs = ref(this.db, `smokers/${smokerId}/smokes`);
		push(refs, smoke);
		this.updateLabels(smokerId, smoke.labels);
	}

	updateSmoke(smokerId: string, smokeId: string, smoke: SmokeContent): void {
		const refs = ref(this.db, `smokers/${smokerId}/smokes/${smokeId}/`);
		update(refs, smoke);
		this.updateLabels(smokerId, smoke.labels);
	}

	removeSmoke(smokerId: string, smokeId: string): void {
		const refs = ref(this.db, `smokers/${smokerId}/smokes/${smokeId}/`);
		set(refs, null);
	}

	syncSmokes(smokerId: string, listeners: IListeners<ISmoke>): Unsubscribe {
		const refs = ref(this.db, `smokers/${smokerId}/smokes`);
		return this.listenToRefChanges(refs, listeners);
	}

	syncLabels(smokerId: string, listeners: IListeners<{ id: string }>): Unsubscribe {
		const refs = ref(this.db, `smokers/${smokerId}/labels`);
		return this.listenToRefChanges(refs, listeners);
	}

	reset(smokerId: string): void {
		const refs = ref(this.db, `smokers/${smokerId}/smokes`);
		set(refs, null);
	}

	addLabels(smokerId: string, labels: string[]): void {
		const labelsToAdd = labels.reduce(
			(result, label) => {
				result[label] = true;
				return result;
			},
			{} as Record<string, true>
		);
		return this.updateLabels(smokerId, labelsToAdd);
	}

	removeLabels(smokerId: string, labels: string[]): void {
		const labelsToRemove = labels.reduce(
			(result, label) => {
				result[label] = null;
				return result;
			},
			{} as Record<string, null>
		);
		return this.updateLabels(smokerId, labelsToRemove);
	}

	private updateLabels(smokerId: string, labels: Record<string, true | null>): void {
		const refs = ref(this.db, `smokers/${smokerId}/labels`);
		update(refs, labels);
	}

	private listenToRefChanges<T>(ref: DatabaseReference, listeners: IListeners<T>): Unsubscribe {
		const subs = [
			listeners.onAdd
				? onChildAdded(ref, (s: DataSnapshot) =>
						listeners.onAdd!({ id: s.key, ...s.val() })
					)
				: () => {},
			listeners.onUpdate
				? onChildChanged(ref, s => listeners.onUpdate!({ id: s.key, ...s.val() }))
				: () => {},
			listeners.onRemove
				? onChildRemoved(ref, s => listeners.onRemove!({ id: s.key, ...s.val() }))
				: () => {},
			listeners.getAll
				? onValue(ref, s => listeners.getAll!(recordToList(s.val() ?? {})), {
						onlyOnce: true,
					})
				: () => {},
		];

		return () => subs.forEach(sub => sub());
	}
}
