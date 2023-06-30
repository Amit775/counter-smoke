import { Routes } from '@angular/router';

export default [
	{ path: 'phone', loadComponent: () => import('./verify-phone/verify-phone.component') },
	{ path: 'code', loadComponent: () => import('./verify-code/verify-code.component') },
	{ path: '**', redirectTo: 'phone' },
] as Routes;
