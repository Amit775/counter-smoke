import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { filterNilValue } from '@datorama/akita';
import { map, timer } from 'rxjs';
import { SmokesService } from 'src/app/core/smokes/smokes.service';

import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SmokeContent, SmokesStore, createEmptySmoke } from 'src/app/core/smokes/smokes.store';
import { SmokeLabelComponent } from '../smoke-form/smoke-label/smoke-label.component';
import { AgoPipe } from './ago.pipe';

@Component({
	standalone: true,
	selector: 'app-i-smoke',
	templateUrl: './i-smoke.component.html',
	styleUrls: ['./i-smoke.component.scss'],
	imports: [
		CommonModule,
		AgoPipe,
		SmokeLabelComponent,
		MatProgressSpinnerModule,
		MatButtonModule,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ISmokeComponent implements OnInit {
	private store = inject(SmokesStore);
	private service: SmokesService = inject(SmokesService);

	public emptySmoke: SmokeContent = createEmptySmoke();

	todayCount = this.store.countToday;
	lastCigareteDiff$ = timer(0, 1000 * 60).pipe(
		map(() => this.store.lastCigarette()),
		filterNilValue(),
		map(smokeTime => Date.now() - smokeTime)
	);
	loading = this.store.isLoading;

	ngOnInit(): void {
		if (this.store.shortcut.isFromShortcut()) {
			const label = this.store.shortcut.label();
			this.service.addSmokeNow(label ? { [label]: true } : {});
			this.service.setShortcut(false);
		}
	}

	inc(): void {
		this.service.addSmokeNow(this.emptySmoke.labels);
		this.emptySmoke = createEmptySmoke();
	}
}
