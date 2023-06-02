import { TemplatePortal } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, TemplateRef, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { Observable } from 'rxjs';
import { PanelService } from 'src/app/core/panel.service';
import { SmokesQuery } from 'src/app/core/smokes/smokes.query';
import { SmokesService } from 'src/app/core/smokes/smokes.service';
import { ISmoke, SmokeContent, createEmptySmoke } from 'src/app/core/smokes/smokes.store';
import { MaterialModule } from 'src/app/shared/material.module';
import { Action, SmokeFormComponent } from '../../smoke-form/smoke-form.component';
import { DialogComponent as RemoveDialogComponent } from '../remove-dialog.component';
import { SmokeRecordComponent } from '../smoke-record/smoke-record.component';
import { D } from '@angular/cdk/keycodes';

@Component({
	standalone: true,
	imports: [CommonModule, MaterialModule, SmokeRecordComponent, SmokeFormComponent],
	selector: 'app-smokes-list',
	templateUrl: './smokes-list.component.html',
	styleUrls: ['./smokes-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmokesListComponent implements OnChanges {
	@Input() public date!: Date;

	private dialog: MatDialog = inject(MatDialog);
	private service: SmokesService = inject(SmokesService);
	private query: SmokesQuery = inject(SmokesQuery);
	private panel: PanelService = inject(PanelService);
	private vcr: ViewContainerRef = inject(ViewContainerRef);

	@ViewChild('editSmoke', { static: true, read: TemplateRef }) private editSmoke: TemplateRef<unknown> | undefined;

	smokes$!: Observable<ISmoke[]>;

	public selectedSmoke: ISmoke | undefined = undefined;

	ngOnChanges(): void {
		this.smokes$ = this.query.selectSmokesAtDate(this.date);
	}

	setSelectedSmoke(selected: MatSelectionListChange): void {
		this.selectedSmoke = selected.options?.[0]?.value;
		if (this.selectedSmoke == null) return;

		this.openPanel(this.selectedSmoke, () => selected.source.deselectAll());
	}

	createSmoke(): void {
		const now = new Date();
		const nowAtDate = new Date(this.date).setHours(now.getHours(), now.getMinutes(), now.getSeconds());
		this.openPanel(createEmptySmoke(nowAtDate));
	}

	do(action: Action): void {
		this.panel.close();
		this.selectedSmoke = undefined;
		this.executeAction(action);
	}

	smokeRemoved(smoke: ISmoke): void {
		const ref = this.dialog.open(RemoveDialogComponent);
		ref.afterClosed().subscribe(toBeRemoved => {
			if (toBeRemoved) {
				this.service.removeSmoke(smoke);
			}
		});
	}

	private openPanel(smoke: ISmoke | SmokeContent, onClose?: () => void): void {
		const portal = new TemplatePortal(this.editSmoke!, this.vcr, { $implicit: smoke });
		const ref = this.panel.open(portal, onClose);
		ref.backdropClick().subscribe(() => this.do({ type: 'cancel' }));
	}

	private executeAction(action: Action): void {
		switch (action.type) {
			case 'delete':
				return this.smokeRemoved(action.smoke);
			case 'edit':
				return this.service.updateSmoke(action.smoke);
			case 'create':
				delete action.smoke.id;
				return this.service.addSmoke(action.smoke);
			case 'cancel':
			default:
				return;
		}
	}
}
