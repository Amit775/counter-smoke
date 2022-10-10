import { Component } from '@angular/core';
import { SmokesQuery } from 'src/app/core/smokes/smokes.query';
import { SmokesService } from 'src/app/core/smokes/smokes.service';

@Component({
	selector: 'app-i-smoke',
	templateUrl: './i-smoke.component.html',
	styleUrls: ['./i-smoke.component.scss'],
})
export class ISmokeComponent {

	constructor(private query: SmokesQuery, private service: SmokesService) { }

	todayCount$ = this.query.selectCountToday();
	lastCigarete$ = this.query.selectLast(smoke => smoke?.timestamp);
	loading$ = this.query.selectLoading();

	inc(): void {
		this.service.inc();
	}
}