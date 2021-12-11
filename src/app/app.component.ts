import { Component, OnDestroy, OnInit } from '@angular/core';
import { TeardownLogic } from 'rxjs';
import { SmokerQuery } from './core/smoker/smoker.query';
import { SmokerService } from './core/smoker/smoker.service';
import { SmokesQuery } from './core/smokes/smokes.query';
import { SmokesService } from './core/smokes/smokes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private service: SmokesService, private smoker: SmokerQuery) { }

  signedIn$ = this.smoker.selectIsLoggedIn();
  private sub: TeardownLogic | undefined;
  ngOnInit(): void {
      this.sub = this.service.syncData();
  }

  ngOnDestroy(): void {
      if (typeof this.sub === 'function') this.sub();
  }


}
