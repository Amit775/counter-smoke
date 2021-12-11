import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SmokerQuery } from './smoker.query';
import { ISmoker, SmokerStore } from './smoker.store';

@Injectable({ providedIn: 'root' })
export class SmokerService {
  constructor(private query: SmokerQuery, private store: SmokerStore) {}

  public getCurrentSmoker(): ISmoker {
    return this.query.getValue();
  }

  public selectCurrentSmoker(): Observable<ISmoker> {
    return this.query.select();
  }

  public setSmoker(smoker: ISmoker): void {
    return this.store.update(smoker);
  }
}
