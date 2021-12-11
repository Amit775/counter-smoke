import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Auth } from 'firebase/auth';
import { TeardownLogic } from 'rxjs';
import { FIREBASE_AUTH } from './core/firebase.app';
import { SmokerQuery } from './core/smoker/smoker.query';
import { SmokerService } from './core/smoker/smoker.service';
import { SmokesQuery } from './core/smokes/smokes.query';
import { SmokesService } from './core/smokes/smokes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private service: SmokesService, 
    private smoker: SmokerQuery,
    private smokerService: SmokerService
    ) {}

  signedIn$ = this.smoker.selectIsLoggedIn();
  private sub: TeardownLogic[] = [];

  ngOnInit(): void {
    this.smokerService.checkAuth();
    this.sub.push(
      this.smoker.select().subscribe((smoker) => {
        this._unsubscribe();
        this.service.syncData();
      })
    );
  }

  ngOnDestroy(): void {
    this._unsubscribe();
  }

  private _unsubscribe(): void {
    this.sub.forEach((sub) => {
      if (typeof sub === 'function') sub();
    });
  }
}
