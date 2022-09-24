import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, tap } from "rxjs";
import { SmokerQuery } from "src/app/core/smoker/smoker.query";

@Injectable()
export class HomeGuard implements CanActivate {
	constructor(
		private smokerQuery: SmokerQuery,
		private router: Router
	) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
		return this.smokerQuery.selectIsLoggedIn().pipe(
			tap(isLoggedIn => {
				if (!isLoggedIn) {
					this.router.navigate(['sign-in']);
				}
			})
		)
	}
}