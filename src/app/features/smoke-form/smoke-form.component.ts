import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { ISmoke } from 'src/app/core/smokes/smokes.store';
import { SMOKE_PANEL_TOKEN } from './smoke-form-panel.service';

export type EditAction = {
	type: 'edit';
	smoke: ISmoke;
};

export type CancelAction = {
	type: 'cancel';
};

export type DeleteAction = {
	type: 'delete';
	smoke: ISmoke;
};

export type Action = EditAction | CancelAction | DeleteAction;

@Component({
	selector: 'app-smoke-form',
	templateUrl: './smoke-form.component.html',
	styleUrls: ['./smoke-form.component.scss'],
})
export class SmokeFormComponent implements OnInit {
	private edittedSmoke!: ISmoke;
	constructor(public dialogRef: DialogRef<Action>, @Inject(SMOKE_PANEL_TOKEN) public smoke: ISmoke) {}

	ngOnInit(): void {
		this.edittedSmoke = { ...this.smoke };
	}

	addLabel(label: string): void {
		this.setEdittedSmoke({
			...this.smoke,
			labels: {
				...this.smoke.labels,
				[label]: true,
			},
		});
	}

	removeLabel(label: string): void {
		const { [label]: remove, ...others } = this.smoke.labels;
		this.setEdittedSmoke({
			...this.smoke,
			labels: others,
		});
	}

	changeTime(timePicker: HTMLInputElement): void {
		const [hours, minutes] = timePicker.value.split(':');
		this.setEdittedSmoke({ ...this.smoke, timestamp: new Date(this.smoke.timestamp).setHours(+hours, +minutes) });
	}

	cancel(): void {
		this.dialogRef.close({ type: 'cancel' });
	}

	delete(smoke: ISmoke): void {
		console.log('delete', smoke);
		this.dialogRef.close({ type: 'delete', smoke: smoke });
	}

	edit(smoke: ISmoke) {
		console.log('edit', this.smoke);
		this.dialogRef.close({ type: 'edit', smoke: this.edittedSmoke });
	}

	private setEdittedSmoke(smoke: ISmoke): void {
		this.edittedSmoke = smoke;
	}
}
