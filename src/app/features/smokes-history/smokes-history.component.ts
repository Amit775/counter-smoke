import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { SmokesQuery } from 'src/app/core/smokes/smokes.query';
import { SmokesService } from 'src/app/core/smokes/smokes.service';
import { ISmoke } from 'src/app/core/smokes/smokes.store';

import { default as flatpickr } from 'flatpickr';
import { Instance } from 'flatpickr/dist/types/instance';
import { CountAtDayPlugin } from './count-at-day-plugin';

@Component({
	selector: 'app-smokes-history',
	templateUrl: './smokes-history.component.html',
	styleUrls: ['./smokes-history.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmokesHistoryComponent implements OnInit, AfterViewInit {
	dates$!: Observable<{ date: number; smokes: ISmoke[] }[]>;

	@ViewChild('container') private container!: ElementRef;
	instance!: Instance;

	constructor(
		private smokes: SmokesQuery,
		private service: SmokesService,
		private dialog: MatDialog
	) { }

	ngOnInit(): void {
		this.dates$ = this.smokes.selectByDates();
	}

	ngAfterViewInit(): void {
		this.instance = flatpickr(this.container.nativeElement, {
			inline: true,
			plugins: [CountAtDayPlugin({ [new Date().setHours(0, 0, 0, 0)]: 6 })]
		});
	}

	trackById(index: number, smoke: ISmoke): string {
		return smoke.id;
	}

	sortBy(smoke: ISmoke): number {
		return smoke.timestamp;
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
export class DialogComponent { }
