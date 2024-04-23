import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import {
	EventType,
	Router,
	RouterLink,
	RouterLinkActive,
	RouterOutlet,
	UrlTree,
} from '@angular/router';
import { getState } from '@ngrx/signals';
import { map, merge } from 'rxjs';
import { Service } from './core/store/service';
import { Store } from './core/store/store';
import { SignInService } from './sign-in/sign-in.service';
import { authTabs, homeTabs } from './tabs';
import { DisposerSink } from './utils/sink';
import { filterNil } from './utils/filter-nil';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [
		NgFor,
		RouterLinkActive,
		RouterLink,
		RouterOutlet,
		AsyncPipe,
		MatTabsModule,
		MatIconModule,
	],
})
export class AppComponent {
	private service: Service = inject(Service);
	private store = inject(Store);
	private signInService: SignInService = inject(SignInService);
	private router: Router = inject(Router);

	tabs = computed(() => {
		if (!this.store.isInitialized()) return [];

		return this.store.smokerId() == null ? authTabs : homeTabs;
	});

	private disposer = new DisposerSink().add([
		this.router.events.subscribe(event => {
			if (event.type === EventType.NavigationStart) {
				if (event.url.toLowerCase().includes('shortcut')) {
					const urlTree: UrlTree = this.router.parseUrl(event.url);
					this.service.setShortcut(true, urlTree.queryParams['label']);
				}
			}
		}),
		toObservable(this.store.smokerId)
			.pipe(
				filterNil(),
				map((smokerId: string) => (this.disposer.sink = this.service.syncData(smokerId)))
			)
			.subscribe(),
		merge(toObservable(this.store.isInitialized), toObservable(this.store.smokerId)).subscribe(
			() => {
				const appState = getState(this.store);
				if (!appState.isInitialized) {
					return this.ensureRoute('loading');
				}
				if (appState.smoker?.id) {
					return this.ensureRoute('home');
				} else {
					return this.ensureRoute('sign-in');
				}
			}
		),
		this.signInService.checkAuth(),
	]);

	private ensureRoute(route: string): void {
		if (!this.router.url.startsWith(`/${route}`)) {
			this.router.navigate([route]);
		}
	}
}
