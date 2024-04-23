import { inject } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { getState } from '@ngrx/signals';
import { SmokesStore } from '../core/smokes/smokes.store';

export const isAllowedRoute = (route: ActivatedRouteSnapshot): boolean => {
	const store = inject(SmokesStore);
	
	const allowRoute = (route: ActivatedRouteSnapshot, path: string): boolean => {
		return route.url?.[0].path === path;
	};

	const appState = getState(store);

	if (!appState.isInitialized) {
		return allowRoute(route, 'loading');
	}

	if (appState.smoker?.id == null) {
		return allowRoute(route, 'sign-in');
	}

	return allowRoute(route, 'home');
};
