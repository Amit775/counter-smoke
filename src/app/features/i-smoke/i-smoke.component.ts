import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { filterNilValue } from '@datorama/akita';
import { map, switchMapTo, timer } from 'rxjs';
import { SmokesQuery } from 'src/app/core/smokes/smokes.query';
import { SmokesService } from 'src/app/core/smokes/smokes.service';
import { debug } from 'src/app/shared/debug.operator';
import { SmokeLabelService } from '../smoke-form/smoke-label/smoke-label.service';

@Component({
	selector: 'app-i-smoke',
	templateUrl: './i-smoke.component.html',
	styleUrls: ['./i-smoke.component.scss'],
})
export class ISmokeComponent {
	private query: SmokesQuery = inject(SmokesQuery);
	private service: SmokesService = inject(SmokesService);
	private labelPanel: SmokeLabelService = inject(SmokeLabelService);

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

	openLabelPanel(event: MouseEvent, button: MatButton): void {
		event.preventDefault();
		const result = this.labelPanel.openLabel([], button._elementRef.nativeElement);
		// result.subscribe(({ action, value }) => )
	}
}
