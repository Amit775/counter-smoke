import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Order } from '@datorama/akita';
import { Observable, tap } from 'rxjs';
import { SmokesQuery, today } from 'src/app/core/smokes/smokes.query';
import { SmokesService } from 'src/app/core/smokes/smokes.service';
import { ISmoke } from 'src/app/core/smokes/smokes.store';

@Component({
  selector: 'app-smokes-history',
  templateUrl: './smokes-history.component.html',
  styleUrls: ['./smokes-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmokesHistoryComponent {

  smokes$: Observable<ISmoke[]> = this.smokes.selectAll({ sortBy: 'timestamp', sortByOrder: Order.DESC, filterBy: today });
  constructor(
    private smokes: SmokesQuery,
    private service: SmokesService
  ) { }

  trackById(index: number, smoke: ISmoke): string {
    return smoke.id;
  }

  smokeEdited(smoke: ISmoke) {
    this.service.updateSmoke(smoke);
  }

  smokeRemoved(smoke: ISmoke) {
    this.service.removeSmoke(smoke);
  }

}

