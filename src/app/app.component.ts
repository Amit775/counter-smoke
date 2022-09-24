import { Component, OnDestroy, OnInit } from '@angular/core';
import { TeardownLogic, map } from 'rxjs';
import { SmokerQuery } from './core/smoker/smoker.query';
import { SmokerService } from './core/smoker/smoker.service';
import { SmokesService } from './core/smokes/smokes.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
	constructor(
		private service: SmokesService,
		private smoker: SmokerQuery,
		private smokerService: SmokerService
	) { }

	homeTabs = [
		{
			route: 'home',
			icon: 'add_alarm'
		},
		{
			route: 'home/history',
			icon: 'history'
		},
		{
			route: 'home/settings',
			icon: 'settings'
		}
	];

	authTabs = [
		{
			route: 'sign-in/phone',
			icon: 'phone'
		},
		{
			route: 'sign-in/code',
			icon: 'sms'
		}
	]

	signedIn$ = this.smoker.selectIsLoggedIn();
	tabs$ = this.signedIn$.pipe(map(isLoggedIn => isLoggedIn ? this.homeTabs : this.authTabs));
	private sub: TeardownLogic[] = [];

	ngOnInit(): void {
		this.smokerService.checkAuth();
		this.sub.push(
			this.smoker.select().subscribe((smoker) => {
				this._unsubscribe();
				this.service.syncData();
			})
		);
	}

	ngOnDestroy(): void {
		this._unsubscribe();
	}

	private _unsubscribe(): void {
		this.sub.forEach((sub) => {
			if (typeof sub === 'function') sub();
		});
	}
}
