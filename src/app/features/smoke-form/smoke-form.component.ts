import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
	imports: [CommonModule, MaterialModule, SmokeLabelComponent, SmokeTimeComponent],
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

	changeTime(timestamp: number): void {
		this.setEdittedSmoke({ ...this.smoke, timestamp });
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
