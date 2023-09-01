import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TeardownLogic, filter, map, merge } from 'rxjs';
import { SmokesQuery } from './core/smokes/smokes.query';
import { SmokesService } from './core/smokes/smokes.service';
import { SignInService } from './sign-in/sign-in.service';
import { authTabs, homeTabs } from './tabs';

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

	tabs$ = merge(
		this.query
			.select(state => state.isInitialized)
			.pipe(
				filter(isInitialized => !isInitialized),
				map(() => [])
			),
		this.query.select(state => state.smoker?.id).pipe(map(smokerId => (smokerId == null ? authTabs : homeTabs)))
	);

	private disposes: TeardownLogic[] = [];

	ngOnInit(): void {
		this.disposes.push(this.signInService.checkAuth());
		this.disposes.push(
			this.query
				.select(s => s.isInitialized)
				.subscribe(() => {
					this._unsubscribe();
					const appState = this.query.getValue();
					if (!appState.isInitialized) {
						return this.ensureRoute('loading');
					}
					if (appState?.smoker?.id) {
						this.disposes.push(this.service.syncData());
						return this.ensureRoute('home');
					} else {
						return this.ensureRoute('sign-in');
					}
				})
		);
	}

	public ngOnDestroy(): void {
		this._unsubscribe();
	}

	private ensureRoute(route: string): void {
		if (!this.router.url.startsWith(`/${route}`)) {
			this.router.navigate([route]);
		}
	}

	private _unsubscribe(): void {
		this.disposes.forEach(subscription => {
			if (typeof subscription === 'undefined') return;
			if (typeof subscription === 'function') return subscription();

			subscription.unsubscribe();
		});
	}
}
