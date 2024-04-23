import { TemplatePortal } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	TemplateRef,
	ViewContainerRef,
	computed,
	inject,
	input,
	viewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';
import { PanelService } from 'src/app/core/panel.service';
import { Service } from 'src/app/core/store/service';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Store } from 'src/app/core/store';
import { ISmoke, SmokeContent, createEmptySmoke } from 'src/app/models/smoke';
import { Action, SmokeFormComponent } from '../../smoke-form/smoke-form.component';
import { RemoveDialogComponent } from '../remove-dialog.component';
import { SmokeRecordComponent } from '../smoke-record/smoke-record.component';

@Component({
	standalone: true,
	imports: [
		CommonModule,
		SmokeRecordComponent,
		SmokeFormComponent,
		MatListModule,
		MatIconModule,
		MatButtonModule,
	],
	selector: 'app-smokes-list',
	templateUrl: './smokes-list.component.html',
	styleUrls: ['./smokes-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmokesListComponent {
	public date = input.required<Date>();

	private dialog: MatDialog = inject(MatDialog);
	private service: Service = inject(Service);
	private store = inject(Store);
	private panel: PanelService = inject(PanelService);
	private vcr: ViewContainerRef = inject(ViewContainerRef);

	private editSmoke = viewChild.required('editSmoke', { read: TemplateRef });

	smokes = computed(() => {
		const date = this.date();
		const smokes = this.store.smokesEntities();

		return smokes
			.reduce(
				(acc, smoke) => [
					...acc,
					...(new Date(smoke.timestamp).setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0)
						? [smoke]
						: []),
				],
				[] as ISmoke[]
			)
			.sort((a, b) => a.timestamp - b.timestamp);
	});

	public selectedSmoke: ISmoke | undefined = undefined;

	setSelectedSmoke(selected: MatSelectionListChange): void {
		this.selectedSmoke = selected.options?.[0]?.value;
		if (this.selectedSmoke == null) return;

		this.openPanel(this.selectedSmoke, () => selected.source.deselectAll());
	}

	createSmoke(): void {
		const now = new Date();
		const nowAtDate = new Date(this.date()).setHours(
			now.getHours(),
			now.getMinutes(),
			now.getSeconds()
		);
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
		const portal = new TemplatePortal(this.editSmoke(), this.vcr, { $implicit: smoke });
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
