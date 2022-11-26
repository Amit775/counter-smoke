import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { SmokesQuery } from 'src/app/core/smokes/smokes.query';
import { SmokesService } from 'src/app/core/smokes/smokes.service';
import { ISmoke } from 'src/app/core/smokes/smokes.store';
import { SmokeFormPanelService } from '../../smoke-form/smoke-form-panel.service';
import { Action } from '../../smoke-form/smoke-form.component';
import { DATE_PANEL_TOEKN } from '../panel.service';
import { DialogComponent as RemoveDialogComponent } from '../remove-dialog.component';

@Component({
	selector: 'app-smokes-list',
	templateUrl: './smokes-list.component.html',
	styleUrls: ['./smokes-list.component.scss']
})
export class SmokesListComponent implements OnInit {

	smokes$!: Observable<ISmoke[]>
	constructor(
		@Inject(DATE_PANEL_TOEKN) public date: Date,
		private dialog: MatDialog,
		private service: SmokesService,
		private query: SmokesQuery,
		private formPanel: SmokeFormPanelService,
	) { }

	ngOnInit(): void {
		this.smokes$ = this.query.selectSmokesAtDate(this.date);
	}

	editSmoke(smoke: ISmoke): void {
		this.formPanel.openPanel(smoke).subscribe({
			next: (action: Action) => this.executeAction(action)
		});
	}

	smokeRemoved(smoke: ISmoke): void {
		const ref = this.dialog.open(RemoveDialogComponent);
		ref.afterClosed().subscribe((toBeRemoved) => {
			if (toBeRemoved) {
				this.service.removeSmoke(smoke);
			}
		});
	}

	private executeAction(action: Action): void {
		switch (action.type) {
			case 'delete':
				return this.smokeRemoved(action.smoke)
			case 'edit':
				return this.service.updateSmoke(action.smoke)
			case 'cancel':
				default:
				return;
		}
	}
}
