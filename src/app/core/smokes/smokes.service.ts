import { Injectable } from "@angular/core";
import { ApiService } from "../api.service";
import { SmokerService } from "../smoker/smoker.service";
import { ISmoke, SmokeContent, Smokes, SmokesStore } from "./smokes.store";

export function DToList(smokes: { [id: string]: SmokeContent}): ISmoke[] {
    return Object.entries(smokes).map(([id, smoke]) => ({id, ...smoke} as ISmoke));
}

export function withoutId<S, T extends S & { id: any }>(obj: T): S {
    delete obj.id;
    return obj;
}

@Injectable({ providedIn: 'root' })
export class SmokesService {
    constructor(
        private api: ApiService,
        private store: SmokesStore,
        private smoker: SmokerService
    ) { }

    inc(): void {
        const smoker = this.smoker.getCurrentSmoker();
        const smoke: SmokeContent = { timestamp: Date.now() };
        this.store.setLoading(true);
        this.api.newSmoke(smoker.id, smoke);
    }

    reset(): void {
        const smoker = this.smoker.getCurrentSmoker();
        this.api.reset(smoker.id);
    }

    syncData(): void {
        const smoker = this.smoker.getCurrentSmoker();
        this.store.setLoading(true);
        this.api.sync(smoker.id, (smokes: Smokes) => {
            this.store.set(DToList(smokes));
            this.store.setLoading(false);
        });
    }

    updateSmoke(smoke: ISmoke): void {
        const smoker = this.smoker.getCurrentSmoker();
        this.store.setLoading(true);
        this.api.updateSmoke(smoker.id, smoke.id, withoutId(smoke));
    }
}