import { Component, OnInit } from '@angular/core';
import { SmokesService } from 'src/app/core/smokes/smokes.service';

@Component({
  selector: 'app-smokes-history',
  templateUrl: './smokes-history.component.html',
  styleUrls: ['./smokes-history.component.scss']
})
export class SmokesHistoryComponent implements OnInit {

  constructor(private service: SmokesService) { }

  ngOnInit(): void {
  }

  reset(): void {
    this.service.reset();
  }

}
