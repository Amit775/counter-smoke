import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISmoke } from 'src/app/core/smokes/smokes.store';

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
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmokeFormComponent implements OnInit {
	private edittedSmoke!: ISmoke;

	@Output() public action = new EventEmitter<Action>();

	@Input() public smoke!: ISmoke;

	ngOnInit(): void {
		console.log('smoke', this.smoke);
		this.edittedSmoke = { ...this.smoke };
	}

	changeTime(timePicker: HTMLInputElement): void {
		const [hours, minutes] = timePicker.value.split(':');
		this.setEdittedSmoke({ ...this.smoke, timestamp: new Date(this.smoke.timestamp).setHours(+hours, +minutes) });
	}

	cancel(): void {
		this.action.emit({ type: 'cancel' });
	}

	delete(smoke: ISmoke): void {
		console.log('delete', smoke);
		this.action.emit({ type: 'delete', smoke: smoke });
	}

	edit(smoke: ISmoke) {
		console.log('edit', this.smoke);
		this.action.emit({ type: 'edit', smoke: this.edittedSmoke });
	}

	private setEdittedSmoke(smoke: ISmoke): void {
		this.edittedSmoke = smoke;
	}
}
