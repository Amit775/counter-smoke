import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { SmokesQuery } from './core/smokes/smokes.query';
import { MaterialModule } from './shared/material.module';

const isAllowedRoute = (route: ActivatedRouteSnapshot): boolean => {
	const query: SmokesQuery = inject(SmokesQuery);
	const allowRoute = (route: ActivatedRouteSnapshot, path: string): boolean => {
		return route.url?.[0].path === path;
	};

	const appState = query.getValue();

	if (!appState.isInitialized) {
		return allowRoute(route, 'loading');
	}

	if (appState.smoker?.id == null) {
		return allowRoute(route, 'sign-in');
	}

	return allowRoute(route, 'home');
};

@Component({
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, MaterialModule],
	template: '<div class="wrapper"><mat-spinner></mat-spinner></div>',
	styles: [
		`
			.wrapper {
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			:host {
				height: 100%;
			}
		`,
	],
})
class LoadingComponent {}

const routes: Routes = [
	{
		path: 'sign-in',
		loadChildren: () => import('./layout/sign-in/sign-in.module'),
		canActivate: [isAllowedRoute],
	},
	{ path: 'home', loadChildren: () => import('./layout/home/home.module'), canActivate: [isAllowedRoute] },
	{ path: 'loading', component: LoadingComponent, canActivate: [isAllowedRoute] },
	{ path: '**', redirectTo: 'loading' },
];
@NgModule({
	imports: [RouterModule.forRoot(routes, { enableTracing: false })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
