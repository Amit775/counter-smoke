import { Routes } from '@angular/router';
import { isAllowedRoute } from './utils/is-allowed-route';

export const APP_ROUTES: Routes = [
	{
		path: 'sign-in',
		loadChildren: () => import('./sign-in/sign-in.routes'),
		canActivate: [isAllowedRoute],
	},
	{
		path: 'home',
		children: [
			{ path: '', pathMatch: 'full', loadComponent: () => import('./features/i-smoke/i-smoke.component') },
			{ path: 'settings', loadComponent: () => import('./features/settings/settings.component') },
			{ path: 'history', loadComponent: () => import('./features/smokes-history/smokes-history.component') },
			{ path: '**', redirectTo: '' },
		],
		canActivate: [isAllowedRoute],
	},
	{ path: 'loading', loadComponent: () => import('./shared/loading.component'), canActivate: [isAllowedRoute] },
	{ path: '**', redirectTo: 'loading' },
];
