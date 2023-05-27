import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { filterNilValue } from '@datorama/akita';
import { map, switchMapTo, timer } from 'rxjs';
import { SmokesQuery } from 'src/app/core/smokes/smokes.query';
import { SmokesService } from 'src/app/core/smokes/smokes.service';
import { ISmoke } from 'src/app/core/smokes/smokes.store';
import { debug } from 'src/app/shared/debug.operator';
import { MaterialModule } from 'src/app/shared/material.module';
import { SmokeLabelComponent } from '../smoke-form/smoke-label/smoke-label.component';
import { AgoPipe } from './ago.pipe';

const createEmptySmoke = (): ISmoke => ({ id: '', timestamp: Date.now(), labels: {} });

@Component({
	standalone: true,
	selector: 'app-i-smoke',
	templateUrl: './i-smoke.component.html',
	styleUrls: ['./i-smoke.component.scss'],
	imports: [MaterialModule, CommonModule, AgoPipe, SmokeLabelComponent, FormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ISmokeComponent {
	private query: SmokesQuery = inject(SmokesQuery);
	private service: SmokesService = inject(SmokesService);

	public emptySmoke: ISmoke = createEmptySmoke();

	todayCount$ = this.query.selectCountToday();
	lastCigareteDiff$ = timer(0, 1000 * 60).pipe(
		switchMapTo(this.query.selectLastCigarete()),
		filterNilValue(),
		map(smokeTime => Date.now() - smokeTime)
	);
	loading$ = this.query.selectLoading().pipe(debug('loading'));

	inc(): void {
		this.service.inc(this.emptySmoke.labels);
		this.emptySmoke = createEmptySmoke();
	}
}
