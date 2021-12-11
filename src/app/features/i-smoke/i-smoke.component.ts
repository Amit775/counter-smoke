import { Component, OnInit } from '@angular/core';
import { SmokesService } from 'src/app/core/smokes/smokes.service';
import { SmokesQuery } from 'src/app/core/smokes/smokes.query';

@Component({
  selector: 'app-i-smoke',
  templateUrl: './i-smoke.component.html',
  styleUrls: ['./i-smoke.component.scss']
})
export class ISmokeComponent {

  constructor(private smokes: SmokesQuery, private service: SmokesService) { }

  todayCount$ = this.smokes.selectCountToday();
  loading$ = this.smokes.selectLoading();

  inc(): void {
    this.service.inc();
  }

}
