import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ISmoke, SmokeContent, createEmptySmoke } from 'src/app/models/smoke';
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
	isRemoveDisabled: boolean;
	action: 'edit' | 'create';
}

const editStrategy: FormStrategy = {
	isRemoveDisabled: false,
	action: 'edit',
};

const createStrategy: FormStrategy = {
	isRemoveDisabled: true,
	action: 'create',
};

@Component({
	standalone: true,
	imports: [
		CommonModule,
		SmokeLabelComponent,
		SmokeTimeComponent,
		FormsModule,
		MatIconModule,
		MatButtonModule,
	],
	selector: 'app-smoke-form',
	templateUrl: './smoke-form.component.html',
	styleUrls: ['./smoke-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmokeFormComponent {
	public smoke = input.required<ISmoke>();
	public formStrategy = computed(() => (this.smoke().id ? editStrategy : createStrategy));
	public edittedSmoke = computed(() => ({
		...{ ...createEmptySmoke(), id: '' },
		...this.smoke(),
	}));

	public action = output<Action>();

	cancel(): void {
		this.action.emit({ type: 'cancel' });
	}

	delete(): void {
		this.action.emit({ type: 'delete', smoke: this.smoke() });
	}

	upsert() {
		this.action.emit({ type: this.formStrategy().action, smoke: this.edittedSmoke() });
	}
}
