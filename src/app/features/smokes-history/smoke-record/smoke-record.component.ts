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
	@Input() selected!: boolean;

	@Output() smokeChange = new EventEmitter<ISmoke>();
	@Output() removed = new EventEmitter<ISmoke>();

	readonly time: string = "HH:mm";

	openClock(): void {
		console.log('open clock');
	}

	edit(smoke: ISmoke): void {
		this.smokeChange.emit(smoke);
	}

	remove(): void {
		this.removed.emit(this.smoke);
	}
}
