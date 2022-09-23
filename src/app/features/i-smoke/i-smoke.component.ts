import { Component } from '@angular/core';
import { SmokesQuery } from 'src/app/core/smokes/smokes.query';
import { SmokesService } from 'src/app/core/smokes/smokes.service';

@Component({
	selector: 'app-i-smoke',
	templateUrl: './i-smoke.component.html',
	styleUrls: ['./i-smoke.component.scss']
})
export class ISmokeComponent {

	constructor(private smokes: SmokesQuery, private service: SmokesService) { }

	todayCount$ = this.smokes.selectCountToday();
	loading$ = this.smokes.selectLoading();

	inc(): void {
		this.service.inc();
	}
}