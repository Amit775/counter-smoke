import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { filterNilValue } from '@datorama/akita';
import { map, switchMapTo, timer } from 'rxjs';
import { SmokesQuery } from 'src/app/core/smokes/smokes.query';
import { SmokesService } from 'src/app/core/smokes/smokes.service';
import { debug } from 'src/app/shared/debug.operator';
import { SmokeLabelService } from '../smoke-form/smoke-label/smoke-label.service';
import { ISmoke } from 'src/app/core/smokes/smokes.store';

@Component({
	selector: 'app-i-smoke',
	templateUrl: './i-smoke.component.html',
	styleUrls: ['./i-smoke.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ISmokeComponent {
	private query: SmokesQuery = inject(SmokesQuery);
	private service: SmokesService = inject(SmokesService);

	public emptySmoke: ISmoke = { id: '', timestamp: Date.now(), labels: {} };

	todayCount$ = this.query.selectCountToday();
	lastCigareteDiff$ = timer(0, 1000 * 60).pipe(
		switchMapTo(this.query.selectLastCigarete()),
		filterNilValue(),
		map(smokeTime => Date.now() - smokeTime)
	);
	loading$ = this.query.selectLoading().pipe(debug('loading'));

	inc(): void {
		this.service.inc();
	}
}
