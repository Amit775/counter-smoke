import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { SmokesQuery } from 'src/app/core/smokes/smokes.query';
import { SmokesService } from 'src/app/core/smokes/smokes.service';
import { ISmoke } from 'src/app/core/smokes/smokes.store';
import { Action } from '../../smoke-form/smoke-form.component';
import { DATE_PANEL_TOEKN } from '../panel.service';
import { DialogComponent as RemoveDialogComponent } from '../remove-dialog.component';

@Component({
	selector: 'app-smokes-list',
	templateUrl: './smokes-list.component.html',
	styleUrls: ['./smokes-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmokesListComponent implements OnInit {
	public date: Date = inject(DATE_PANEL_TOEKN);
	private dialog: MatDialog = inject(MatDialog);
	private service: SmokesService = inject(SmokesService);
	private query: SmokesQuery = inject(SmokesQuery);

	smokes$!: Observable<ISmoke[]>;

	ngOnInit(): void {
		this.smokes$ = this.query.selectSmokesAtDate(this.date);
	}

	smokeRemoved(smoke: ISmoke): void {
		const ref = this.dialog.open(RemoveDialogComponent);
		ref.afterClosed().subscribe(toBeRemoved => {
			if (toBeRemoved) {
				this.service.removeSmoke(smoke);
			}
		});
	}

	private executeAction(action: Action): void {
		switch (action.type) {
			case 'delete':
				return this.smokeRemoved(action.smoke);
			case 'edit':
				return this.service.updateSmoke(action.smoke);
			case 'cancel':
			default:
				return;
		}
	}
}
