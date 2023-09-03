import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { EventType, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, map, merge } from 'rxjs';
import { SmokesQuery } from './core/smokes/smokes.query';
import { SmokesService } from './core/smokes/smokes.service';
import { SignInService } from './sign-in/sign-in.service';
import { authTabs, homeTabs } from './tabs';
import { DisposerSink } from './utils/sink';

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

	private disposer = new DisposerSink();

	ngOnInit(): void {
		this.disposer.sink = this.router.events.subscribe(event => {
			if (event.type === EventType.NavigationStart) {
				if (event.url.toLowerCase().includes('shortcut')) {
					this.service.setFromShortcut(true);
				}
			}
		});

		setTimeout(() => {
			this.disposer.sink = merge(
				this.query.select(s => s.isInitialized),
				this.query.select(s => s.smoker?.id)
			).subscribe(() => {
				this.disposer.dispose();
				const appState = this.query.getValue();
				if (!appState.isInitialized) {
					return this.ensureRoute('loading');
				}
				if (appState.smoker?.id) {
					return this.ensureRoute('home');
				} else {
					return this.ensureRoute('sign-in');
				}
			});
			this.disposer.sink = this.signInService.checkAuth();
		}, 0);
	}

	public ngOnDestroy(): void {
		this.disposer.dispose();
	}

	private ensureRoute(route: string): void {
		if (!this.router.url.startsWith(`/${route}`)) {
			this.router.navigate([route]);
		}
	}
}
