import { Inject, Injectable } from '@angular/core';
import { Auth } from 'firebase/auth';
import { Observable } from 'rxjs';
import { FIREBASE_AUTH } from '../firebase.app';
import { SmokerQuery } from './smoker.query';
import { ISmoker, SmokerStore } from './smoker.store';

@Injectable({ providedIn: 'root' })
export class SmokerService {
  constructor(
    private query: SmokerQuery,
    private store: SmokerStore,
    @Inject(FIREBASE_AUTH) private auth: Auth
  ) {}

  public getCurrentSmoker(): ISmoker {
    return this.query.getValue();
  }

  public selectCurrentSmoker(): Observable<ISmoker> {
    return this.query.select();
  }

  public setSmoker(smoker: ISmoker): void {
    return this.store.update(smoker);
  }

  public checkAuth(): void {
    this.auth.onAuthStateChanged((user) => {
      if (user != null) this.setSmoker({ id: user.uid });
    });
  }
}
