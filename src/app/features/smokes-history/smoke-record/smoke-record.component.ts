import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ISmoke } from 'src/app/core/smokes/smokes.store';

@Component({
	selector: 'app-smoke-record',
	templateUrl: './smoke-record.component.html',
	styleUrls: ['./smoke-record.component.scss']
})
export class SmokeRecordComponent {

	@Input() smoke!: ISmoke;
	@Input() index!: number;

	private _selected!: boolean;
	@Input() set selected(value: boolean) {
		if (!value) {
			this.isEditMode = false;
		}

		this._selected = value
	}
	get selected(): boolean {
		return this._selected;
	}

	@Output() edited = new EventEmitter<ISmoke>();
	@Output() removed = new EventEmitter<ISmoke>();

	readonly time: string = "HH:mm";

	isEditMode: boolean = false;

	openClock(): void {
		this.isEditMode = true;
	}

	blurr(timePicker: HTMLInputElement): void {
		console.log(timePicker, timePicker.valueAsDate, timePicker.value);
		const [hours, minutes] = timePicker.value.split(':');
		this.edit({ ...this.smoke, timestamp: new Date(this.smoke.timestamp).setHours(+hours, +minutes) })
		this.isEditMode = false;
	}

	dateChanged(value: string): void {
		console.log('change', value);
	}

	edit(smoke: ISmoke): void {
		this.edited.emit(smoke);
	}

	remove(): void {
		this.removed.emit(this.smoke);
	}
}
