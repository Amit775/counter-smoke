import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { filterNilValue } from '@datorama/akita';
import { map, switchMapTo, timer } from 'rxjs';
import { SmokesQuery } from 'src/app/core/smokes/smokes.query';
import { SmokesService } from 'src/app/core/smokes/smokes.service';
import { ISmoke, createEmptySmoke } from 'src/app/core/smokes/smokes.store';
import { MaterialModule } from 'src/app/shared/material.module';
import { SmokeLabelComponent } from '../smoke-form/smoke-label/smoke-label.component';
import { AgoPipe } from './ago.pipe';

@Component({
	standalone: true,
	selector: 'app-i-smoke',
	templateUrl: './i-smoke.component.html',
	styleUrls: ['./i-smoke.component.scss'],
	imports: [MaterialModule, CommonModule, AgoPipe, SmokeLabelComponent],
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
	loading$ = this.query.selectLoading();

	inc(): void {
		this.service.inc(this.emptySmoke.labels);
		this.emptySmoke = createEmptySmoke();
	}
}
