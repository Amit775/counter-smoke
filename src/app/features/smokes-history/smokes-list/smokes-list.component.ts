import { Component, Inject, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { SmokesQuery } from 'src/app/core/smokes/smokes.query';
import { SmokesService } from 'src/app/core/smokes/smokes.service';
import { ISmoke } from 'src/app/core/smokes/smokes.store';
import { DATE_PANEL_TOEKN } from '../panel.service';
import { DialogComponent as RemoveDialogComponent } from '../remove-dialog.component';

@Component({
	selector: 'app-smokes-list',
	templateUrl: './smokes-list.component.html',
	styleUrls: ['./smokes-list.component.scss'],
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

	smokeEdited(smoke: ISmoke): void {
		this.service.updateSmoke(smoke);
	}

	smokeRemoved(smoke: ISmoke): void {
		const ref = this.dialog.open(RemoveDialogComponent);
		ref.afterClosed().subscribe(toBeRemoved => {
			if (toBeRemoved) {
				this.service.removeSmoke(smoke);
			}
		});
	}
}
