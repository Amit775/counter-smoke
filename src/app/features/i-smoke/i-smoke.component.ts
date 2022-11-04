import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { filterNilValue } from '@datorama/akita';
import { map, switchMapTo, timer } from 'rxjs';
import { SmokesQuery } from 'src/app/core/smokes/smokes.query';
import { SmokesService } from 'src/app/core/smokes/smokes.service';
import { SmokeLabelService } from '../smokes-history/smoke-label/smoke-label.service';

@Component({
	selector: 'app-i-smoke',
	templateUrl: './i-smoke.component.html',
	styleUrls: ['./i-smoke.component.scss'],
})
export class ISmokeComponent {

	constructor(
		private query: SmokesQuery,
		private service: SmokesService,
		private labelPanel: SmokeLabelService
	) { }

	todayCount$ = this.query.selectCountToday();
	lastCigareteDiff$ = timer(0, 1000 * 60).pipe(
		switchMapTo(this.query.selectLast(smoke => smoke?.timestamp)),
		filterNilValue(),
		map(smokeTime => Date.now() - smokeTime)
	);
	loading$ = this.query.selectLoading();

	inc(): void {
		this.service.inc();
	}

	openLabelPanel(event: MouseEvent, button: MatButton): void {
		event.preventDefault();
		const result = this.labelPanel.openLabel([], button._elementRef.nativeElement);
		// result.subscribe(({ action, value }) => )
	}
}