import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';
import { TeardownLogic, filter, map, merge } from 'rxjs';
import { SmokesQuery } from './core/smokes/smokes.query';
import { SmokesService } from './core/smokes/smokes.service';
import { NgFor, AsyncPipe } from '@angular/common';
import { SignInService } from './sign-in/sign-in.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [NgFor, RouterLinkActive, RouterLink, RouterOutlet, AsyncPipe, MatTabsModule, MatIconModule],
})
export class AppComponent implements OnInit, OnDestroy {
	private service: SmokesService = inject(SmokesService);
	private query: SmokesQuery = inject(SmokesQuery);
	private signInService: SignInService = inject(SignInService);
	private router: Router = inject(Router);

	homeTabs = [
		{
			route: 'home',
			icon: 'add_alarm',
		},
		{
			route: 'home/history',
			icon: 'history',
		},
		{
			route: 'home/settings',
			icon: 'settings',
		},
	];

	authTabs = [
		{
			route: 'sign-in/phone',
			icon: 'phone',
		},
		{
			route: 'sign-in/code',
			icon: 'sms',
		},
	];

	tabs$ = merge(
		this.query
			.select(state => state.isInitialized)
			.pipe(
				filter(isInitialized => !isInitialized),
				map(() => [])
			),
		this.query.select(state => state.smoker?.id).pipe(map(smokerId => (smokerId == null ? this.authTabs : this.homeTabs)))
	);

	private sub: TeardownLogic[] = [];

	ngOnInit(): void {
		this.signInService.checkAuth();
		this.sub.push(
			this.query
				.select(s => s.isInitialized)
				.subscribe(() => {
					this._unsubscribe();
					const appState = this.query.getValue();
					if (!appState.isInitialized) {
						return this.ensureRoute('loading');
					}
					if (appState?.smoker?.id) {
						this.service.syncData();
						return this.ensureRoute('home');
					} else {
						return this.ensureRoute('sign-in');
					}
				})
		);
	}

	private ensureRoute(route: string): void {
		if (!this.router.url.startsWith(`/${route}`)) {
			this.router.navigate([route]);
		}
	}

	ngOnDestroy(): void {
		this._unsubscribe();
	}

	private _unsubscribe(): void {
		this.sub.forEach(sub => {
			if (typeof sub === 'function') sub();
		});
	}
}
