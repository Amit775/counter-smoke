import { Injectable } from "@angular/core";
import { guid } from "@datorama/akita";
import { Observable, tap } from "rxjs";
import { ApiService } from "./api.service";
import { ISmoke, SmokesStore } from "./store/smokes.store";

@Injectable({ providedIn: 'root' })
export class SmokesService {
    constructor(private api: ApiService, private store: SmokesStore) { }

    inc(): Observable<ISmoke> {
        const smoke: ISmoke = { id: guid(), timestamp: Date.now() };
        this.store.setLoading(true);
        return this.api.newSmoke(smoke).pipe(
            tap(result => this.store.add(result)), 
            tap(() => this.store.setLoading(false))
        );
    }

    load(): Observable<ISmoke[]> {
        return this.api.getSmokes().pipe(tap(_ => this.store.set(_)));
    }
}