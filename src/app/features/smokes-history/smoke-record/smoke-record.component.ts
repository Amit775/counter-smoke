import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ISmoke } from 'src/app/core/smokes/smokes.store';

@Component({
	selector: 'app-smoke-record',
	templateUrl: './smoke-record.component.html',
	styleUrls: ['./smoke-record.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmokeRecordComponent {
	@Input() smoke!: ISmoke;
	@Input() index!: number;
}
