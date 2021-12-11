import { Component, OnDestroy, OnInit } from '@angular/core';
import { TeardownLogic } from 'rxjs';
import { SmokesService } from './core/smokes/smokes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private service: SmokesService) { }
  private sub: TeardownLogic | undefined;
  ngOnInit(): void {
      this.sub = this.service.syncData();
  }

  ngOnDestroy(): void {
      if (typeof this.sub === 'function') this.sub();
  }
  title = 'counter-smoke';
}
