import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ISmoke } from 'src/app/core/smokes/smokes.store';
import { SmokeLabelService } from '../smoke-label-panel/smoke-label.service';

@Component({
	selector: 'app-smoke-record',
	templateUrl: './smoke-record.component.html',
	styleUrls: ['./smoke-record.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmokeRecordComponent {

	@Input() smoke!: ISmoke;
	@Input() index!: number;

	private _selected!: boolean;
	@Input() set selected(value: boolean) {
		if (!value) {
			this.isEditMode.time = false;
			this.isEditMode.labels = false;
		}

		this._selected = value
	}
	get selected(): boolean {
		return this._selected;
	}

	@Output() edited = new EventEmitter<ISmoke>();
	@Output() removed = new EventEmitter<ISmoke>();

	constructor(
		private labelService: SmokeLabelService
	) { }

	readonly time: string = "HH:mm";

	isEditMode: { time: boolean, labels: boolean } = {
		time: false,
		labels: false
	};

	openClock(): void {
		this.isEditMode.time = !this.isEditMode.time;
	}

	openLabel(origin: MatButton): void {
		this.isEditMode.labels = !this.isEditMode.labels;
	}

	addLabel(label: string): void {
		this.edit({
			...this.smoke,
			labels: {
				...this.smoke.labels,
				[label]: true
			}
		})
	}

	removeLabel(label: string): void {
		const { [label]: remove, ...others } = this.smoke.labels;
		this.edit({
			...this.smoke,
			labels: others
		})
	}

	changeTime(timePicker: HTMLInputElement): void {
		const [hours, minutes] = timePicker.value.split(':');
		this.edit({ ...this.smoke, timestamp: new Date(this.smoke.timestamp).setHours(+hours, +minutes) })
		this.isEditMode.time = false;
	}

	cancelEdit(): void {
		this.isEditMode.time = false;
	}

	edit(smoke: ISmoke): void {
		this.edited.emit(smoke);
	}

	remove(): void {
		this.removed.emit(this.smoke);
	}
}
