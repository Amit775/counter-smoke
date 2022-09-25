import { CommonModule } from "@angular/common";
import { Component, Injectable, NgModule } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterModule, RouterStateSnapshot, Routes } from "@angular/router";
import { SmokesQuery } from "./core/smokes/smokes.query";
import { MaterialModule } from "./shared/material.module";

@Injectable({ providedIn: 'root' })
class RoutineGuard implements CanActivate {
	constructor(
		private query: SmokesQuery
	) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		const appState = this.query.getValue();
		if (!appState.isInitialized) {
			return this.allowRoute(route, 'loading');
		}

		if (appState.smoker?.id == null) {
			return this.allowRoute(route, 'sign-in');
		}

		return this.allowRoute(route, 'home');
	}

	allowRoute(route: ActivatedRouteSnapshot, path: string): boolean {
		return route.url?.[0].path === path;
	}
}
@Component({
	standalone: true,
	imports: [CommonModule, MaterialModule],
	template: '<div class="wrapper"><mat-spinner></mat-spinner></div>',
	styles: [`
		.wrapper {     
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center; } 
		:host { height: 100%; }
	`]
})
class LoadingComponent { }

const routes: Routes = [
	{ path: 'sign-in', loadChildren: () => import('./layout/sign-in/sign-in.module').then(m => m.SignInModule), canActivate: [RoutineGuard] },
	{ path: 'home', loadChildren: () => import('./layout/home/home.module').then(m => m.HomeModule), canActivate: [RoutineGuard] },
	{ path: 'loading', component: LoadingComponent, canActivate: [RoutineGuard] },
	{ path: '**', redirectTo: 'loading' }
]
@NgModule({
	imports: [RouterModule.forRoot(routes, { enableTracing: false })],
	exports: [RouterModule],
})
export class AppRoutingModule { }