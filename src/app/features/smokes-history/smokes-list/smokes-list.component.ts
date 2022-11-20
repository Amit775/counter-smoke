import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { SmokesQuery } from 'src/app/core/smokes/smokes.query';
import { SmokesService } from 'src/app/core/smokes/smokes.service';
import { ISmoke } from 'src/app/core/smokes/smokes.store';
import { SmokeFormPanelService } from '../../smoke-form/smoke-form-panel.service';
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
		this.formPanel.openPanel(smoke, null, () => console.log('close'));
		this.service.updateSmoke(smoke);
	}

	smokeRemoved(smoke: ISmoke): void {
		const ref = this.dialog.open(RemoveDialogComponent);
		ref.afterClosed().subscribe((toBeRemoved) => {
			if (toBeRemoved) {
				this.service.removeSmoke(smoke);
			}
		});
	}
}
