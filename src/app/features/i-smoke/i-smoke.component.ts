import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { filterNilValue } from '@datorama/akita';
import { map, switchMap, timer } from 'rxjs';
import { SmokesQuery } from 'src/app/core/smokes/smokes.query';
import { SmokesService } from 'src/app/core/smokes/smokes.service';
import { SmokeContent, createEmptySmoke } from 'src/app/core/smokes/smokes.store';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SmokeLabelComponent } from '../smoke-form/smoke-label/smoke-label.component';
import { AgoPipe } from './ago.pipe';
import { MatButtonModule } from '@angular/material/button';

@Component({
	standalone: true,
	selector: 'app-i-smoke',
	templateUrl: './i-smoke.component.html',
	styleUrls: ['./i-smoke.component.scss'],
	imports: [CommonModule, AgoPipe, SmokeLabelComponent, MatProgressSpinnerModule, MatButtonModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ISmokeComponent {
	private query: SmokesQuery = inject(SmokesQuery);
	private service: SmokesService = inject(SmokesService);

	public emptySmoke: SmokeContent = createEmptySmoke();

	todayCount$ = this.query.selectCountToday();
	lastCigareteDiff$ = timer(0, 1000 * 60).pipe(
		switchMap(() => this.query.selectLastCigarete()),
		filterNilValue(),
		map(smokeTime => Date.now() - smokeTime)
	);
	loading$ = this.query.selectLoading();

	inc(): void {
		this.service.addSmokeNow(this.emptySmoke.labels);
		this.emptySmoke = createEmptySmoke();
	}
}
