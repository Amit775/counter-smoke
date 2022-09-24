import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeGuard } from "./layout/home/home-guard";
import { SignInGuard } from "./layout/sign-in/sign-in-guard";

const routes: Routes = [
	{ path: 'sign-in', loadChildren: () => import('./layout/sign-in/sign-in.module').then(m => m.SignInModule), canActivate: [SignInGuard] },
	{ path: 'home', loadChildren: () => import('./layout/home/home.module').then(m => m.HomeModule), canActivate: [HomeGuard] },
	{ path: '**', redirectTo: 'sign-in' }
]
@NgModule({
	imports: [RouterModule.forRoot(routes, { enableTracing: false })],
	exports: [RouterModule]
})
export class AppRoutingModule { }