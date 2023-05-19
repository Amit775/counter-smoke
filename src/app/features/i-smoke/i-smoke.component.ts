import { Component, inject } from '@angular/core';
import { filterNilValue } from '@datorama/akita';
import { map, switchMapTo, timer } from 'rxjs';
import { SmokesQuery } from 'src/app/core/smokes/smokes.query';
import { SmokesService } from 'src/app/core/smokes/smokes.service';

@Component({
	selector: 'app-i-smoke',
	templateUrl: './i-smoke.component.html',
	styleUrls: ['./i-smoke.component.scss'],
})
export class ISmokeComponent {
	private query: SmokesQuery = inject(SmokesQuery);
	private service: SmokesService = inject(SmokesService);

	todayCount$ = this.query.selectCountToday();
	lastCigareteDiff$ = timer(0, 1000 * 60).pipe(
		switchMapTo(this.query.selectLastCigarete()),
		filterNilValue(),
		map(smokeTime => Date.now() - smokeTime)
	);
	loading$ = this.query.selectLoading();

	inc(): void {
		this.service.inc();
	}
}