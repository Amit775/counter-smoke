import { Injectable } from '@angular/core';
import { TeardownLogic, Unsubscribable } from 'rxjs';
import { ApiService } from '../api.service';
import { SmokerService } from '../smoker/smoker.service';
import { ISmoke, SmokeContent, Smokes, SmokesStore } from './smokes.store';

export function DToList(smokes: { [id: string]: SmokeContent }): ISmoke[] {
  return Object.entries(smokes).map(
    ([id, smoke]) => ({ id, ...smoke } as ISmoke)
  );
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
  ) {}

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

  syncData(): TeardownLogic {
    const smoker = this.smoker.getCurrentSmoker();
    this.store.setLoading(true);
    return this.api.sync(smoker.id, {
      getAll: (smokes) => {
        this.store.set(smokes);
        this.store.setLoading(false);
      },
      onAdd: (smoke) => {
        this.store.add(smoke);
        this.store.setLoading(false);
      },
      onRemove: (smoke) => {
        this.store.remove(smoke.id);
        this.store.setLoading(false);
      },
      onUpdate: (smoke) => {
        this.store.update(smoke.id, smoke);
        this.store.setLoading(false);
      },
    });
  }

  updateSmoke(smoke: ISmoke): void {
    const smoker = this.smoker.getCurrentSmoker();
    this.store.setLoading(true);
    this.api.updateSmoke(smoker.id, smoke.id, withoutId(smoke));
  }
}
