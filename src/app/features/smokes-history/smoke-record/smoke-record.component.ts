import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ISmoke } from 'src/app/models/smoke';
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
	smoke = input.required<ISmoke>();
	index = input.required<number>();
}
