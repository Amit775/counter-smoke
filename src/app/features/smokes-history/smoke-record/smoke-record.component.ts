import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ISmoke } from 'src/app/core/smokes/smokes.store';
import { SmokeFormPanelService } from '../../smoke-form/smoke-form-panel.service';
import { SmokeLabelService } from '../../smoke-form/smoke-label/smoke-label.service';

@Component({
	selector: 'app-smoke-record',
	templateUrl: './smoke-record.component.html',
	styleUrls: ['./smoke-record.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
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

	@Output() edit = new EventEmitter<ISmoke>();
	@Output() removed = new EventEmitter<ISmoke>();

	constructor(
		private labelService: SmokeLabelService,
		private elemnt: ElementRef
	) { }


	isEditMode: { time: boolean, labels: boolean } = {
		time: false,
		labels: false
	};

	openEdit(origin: MatButton): void {
		this.edit.emit(this.smoke);
	}

	remove(): void {
		this.removed.emit(this.smoke);
	}
}
