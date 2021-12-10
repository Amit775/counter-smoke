import { Component, OnInit } from '@angular/core';
import { Order } from '@datorama/akita';
import { Observable, tap } from 'rxjs';
import { SmokesQuery } from 'src/app/core/smokes/smokes.query';
import { SmokesService } from 'src/app/core/smokes/smokes.service';
import { ISmoke } from 'src/app/core/smokes/smokes.store';

@Component({
  selector: 'app-smokes-history',
  templateUrl: './smokes-history.component.html',
  styleUrls: ['./smokes-history.component.scss']
})
export class SmokesHistoryComponent implements OnInit {

  smokes$: Observable<ISmoke[]> = this.smokes.selectAll({ sortBy: 'timestamp', sortByOrder: Order.DESC });
  constructor(
    private smokes: SmokesQuery
  ) { }

  dateFormat = "dd/MM/yyyy HH:mm:ss";
  trackById(index: number, smoke: ISmoke): string {
    return smoke.id;
  }

  edit(smoke: ISmoke): void {
    console.log(smoke);
  }

  ngOnInit(): void {
  }

}
