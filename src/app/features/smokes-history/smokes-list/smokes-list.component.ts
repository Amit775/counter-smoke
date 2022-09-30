import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SmokesQuery } from 'src/app/core/smokes/smokes.query';
import { ISmoke } from 'src/app/core/smokes/smokes.store';
import { DATE_PANEL_TOEKN } from '../panel.service';

@Component({
	selector: 'app-smokes-list',
	templateUrl: './smokes-list.component.html',
	styleUrls: ['./smokes-list.component.scss']
})
export class SmokesListComponent implements OnInit {

	smokes$!: Observable<ISmoke[]>
	constructor(
		@Inject(DATE_PANEL_TOEKN) public date: Date,
		private query: SmokesQuery
	) { }

	ngOnInit(): void {
		this.smokes$ = this.query.selectSmokesAtDate(this.date);
	}

}
