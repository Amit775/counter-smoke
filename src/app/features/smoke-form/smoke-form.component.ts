import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ISmoke, SmokeContent, createEmptySmoke } from 'src/app/core/smokes/smokes.store';
import { MaterialModule } from 'src/app/shared/material.module';
import { SmokeLabelComponent } from './smoke-label/smoke-label.component';
import { SmokeTimeComponent } from './smoke-time/smoke-time.component';

export type EditAction = {
	type: 'edit';
	smoke: ISmoke;
};

export type CreateSmoke = {
	type: 'create';
	smoke: SmokeContent;
};

export type CancelAction = {
	type: 'cancel';
};

export type DeleteAction = {
	type: 'delete';
	smoke: ISmoke;
};

export type Action = EditAction | CancelAction | DeleteAction | CreateSmoke;

interface FormStrategy {
	isRemovedDisabled: boolean;
	action: 'edit' | 'create';
}

const editStrategy: FormStrategy = {
	isRemovedDisabled: false,
	action: 'edit',
};

const createStrategy: FormStrategy = {
	isRemovedDisabled: true,
	action: 'create',
};

@Component({
	standalone: true,
	imports: [CommonModule, MaterialModule, SmokeLabelComponent, SmokeTimeComponent, FormsModule],
	selector: 'app-smoke-form',
	templateUrl: './smoke-form.component.html',
	styleUrls: ['./smoke-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmokeFormComponent implements OnChanges {
	public formStrategy: FormStrategy = editStrategy;
	public edittedSmoke: ISmoke = { ...createEmptySmoke(), id: '' };

	@Input() public smoke!: ISmoke;

	@Output() public action = new EventEmitter<Action>();

	ngOnChanges(): void {
		this.edittedSmoke = { ...this.edittedSmoke, ...this.smoke };
		if (!this.smoke.id) {
			this.formStrategy = createStrategy;
		}
	}

	cancel(): void {
		this.action.emit({ type: 'cancel' });
	}

	delete(): void {
		this.action.emit({ type: 'delete', smoke: this.smoke });
	}

	upsert() {
		this.action.emit({ type: this.formStrategy.action, smoke: this.edittedSmoke });
	}
}
