import { Inject, Injectable } from "@angular/core";
import { Database, onValue, ref, set, Unsubscribe } from "@firebase/database";
import { push } from "firebase/database";
import { FIREBASE_DB } from "./firebase.app";
import { SmokeContent, Smokes } from "./store/smokes.store";

@Injectable({ providedIn: 'root' })
export class ApiService {
    constructor(@Inject(FIREBASE_DB) private db: Database) { }

    newSmoke(smokerId: string, smoke: SmokeContent): void {
        const refs = ref(this.db, `smokes/${smokerId}/`);
        push(refs, smoke);
    }

    sync(smokerId: string, callback: (smokes: Smokes) => void): Unsubscribe {
        const refs = ref(this.db, `smokes/${smokerId}/`);
        return onValue(refs, s => callback(s.val() ?? {}));
    }

    reset(smokerId: string): void {
        const refs = ref(this.db, `smokes/${smokerId}/`);
        set(refs, null);
    }
}