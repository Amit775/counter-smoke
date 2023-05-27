import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ISmoke } from 'src/app/core/smokes/smokes.store';
import { MaterialModule } from 'src/app/shared/material.module';
import { SmokeLabelComponent } from './smoke-label/smoke-label.component';
import { SmokeTimeComponent } from './smoke-time/smoke-time.component';

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
	standalone: true,
	imports: [CommonModule, MaterialModule, SmokeLabelComponent, SmokeTimeComponent, FormsModule],
	selector: 'app-smoke-form',
	templateUrl: './smoke-form.component.html',
	styleUrls: ['./smoke-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmokeFormComponent implements OnInit {
	public edittedSmoke!: ISmoke;

	@Input() public smoke!: ISmoke;

	@Output() public action = new EventEmitter<Action>();

	ngOnInit(): void {
		this.edittedSmoke = { ...this.smoke };
	}

	cancel(): void {
		this.action.emit({ type: 'cancel' });
	}

	delete(): void {
		this.action.emit({ type: 'delete', smoke: this.smoke });
	}

	edit() {
		this.action.emit({ type: 'edit', smoke: this.edittedSmoke });
	}
}
