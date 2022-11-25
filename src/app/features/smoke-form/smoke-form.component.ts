import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { ISmoke } from 'src/app/core/smokes/smokes.store';

@Component({
	selector: 'app-smoke-form',
	templateUrl: './smoke-form.component.html',
	styleUrls: ['./smoke-form.component.scss']
})
export class SmokeFormComponent<R>  {
	smoke: ISmoke = {
		id: '',
		labels: {},
		timestamp: Date.now()
	}
	constructor(
		public dialogRef: DialogRef<R>
	) { }

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
	}

	cancel(): void {
		console.log('cancel', this.smoke);
	}

	delete(): void {
		console.log('delete', this.smoke);
	}

	edit(smoke: ISmoke) {
		console.log('edit', this.smoke);
	}
}
