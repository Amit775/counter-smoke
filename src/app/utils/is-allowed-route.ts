import { inject } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { SmokesQuery } from '../core/smokes/smokes.query';

export const isAllowedRoute = (route: ActivatedRouteSnapshot): boolean => {
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
