import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { filterNilValue } from '@datorama/akita';
import { filter, map, switchMap, tap, timer } from 'rxjs';
import { SmokesQuery } from 'src/app/core/smokes/smokes.query';
import { SmokesService } from 'src/app/core/smokes/smokes.service';
import { Shortcut, SmokeContent, createEmptySmoke } from 'src/app/core/smokes/smokes.store';

import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DisposerSink } from 'src/app/utils/sink';
import { SmokeLabelComponent } from '../smoke-form/smoke-label/smoke-label.component';
import { AgoPipe } from './ago.pipe';

@Component({
	standalone: true,
	selector: 'app-i-smoke',
	templateUrl: './i-smoke.component.html',
	styleUrls: ['./i-smoke.component.scss'],
	imports: [CommonModule, AgoPipe, SmokeLabelComponent, MatProgressSpinnerModule, MatButtonModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ISmokeComponent implements OnInit, OnDestroy {
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

	private disposer = new DisposerSink();

	ngOnInit(): void {
		this.disposer.sink = this.service.syncData();
		this.disposer.sink = this.query
			.select(s => s.shortcut)
			.pipe(
				filter((shortcut: Shortcut) => shortcut.isFromShortcut),
				tap((shortcut: Shortcut) => {
					this.service.addSmokeNow(shortcut.label ? { [shortcut.label]: true } : {});
					this.service.setShortcut(false);
				})
			)
			.subscribe();
	}

	ngOnDestroy(): void {
		this.disposer.dispose();
	}

	inc(): void {
		this.service.addSmokeNow(this.emptySmoke.labels);
		this.emptySmoke = createEmptySmoke();
	}
}
