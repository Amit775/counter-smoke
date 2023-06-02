import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ISmoke } from 'src/app/core/smokes/smokes.store';
import { JoinPipe } from './join.pipe';

@Component({
	standalone: true,
	imports: [DatePipe, MatTooltipModule, JoinPipe],
	selector: 'app-smoke-record',
	templateUrl: './smoke-record.component.html',
	styleUrls: ['./smoke-record.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmokeRecordComponent {
	@Input() smoke!: ISmoke;
	@Input() index!: number;
}
