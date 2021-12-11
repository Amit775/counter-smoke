import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Order } from '@datorama/akita';
import { Observable, tap } from 'rxjs';
import { SmokesQuery, today } from 'src/app/core/smokes/smokes.query';
import { SmokesService } from 'src/app/core/smokes/smokes.service';
import { ISmoke } from 'src/app/core/smokes/smokes.store';

@Component({
  selector: 'app-smokes-history',
  templateUrl: './smokes-history.component.html',
  styleUrls: ['./smokes-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmokesHistoryComponent {
  smokes$: Observable<ISmoke[]> = this.smokes.selectAll({
    sortBy: 'timestamp',
    sortByOrder: Order.DESC,
    filterBy: today,
  });
  constructor(
    private smokes: SmokesQuery,
    private service: SmokesService,
    private dialog: MatDialog
  ) {}

  trackById(index: number, smoke: ISmoke): string {
    return smoke.id;
  }

  smokeEdited(smoke: ISmoke) {
    this.service.updateSmoke(smoke);
  }

  smokeRemoved(smoke: ISmoke) {
    const ref = this.dialog.open(DialogComponent);
    ref.afterClosed().subscribe((toBeRemoved) => {
      if (toBeRemoved) {
        this.service.removeSmoke(smoke);
      }
    });
  }
}

@Component({
  template: `
    <div class="container">
      <span mat-dialog-title>Are you sure you want to remove that smoke?</span>
      <div mat-dialog-actions>
        <button mat-button [mat-dialog-close]="false">No</button>
        <button mat-button [mat-dialog-close]="true" color="warn">Yes</button>
      </div>
    </div>
  `,
})
export class DialogComponent {}
