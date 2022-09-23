import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ISmokeComponent } from './features/i-smoke/i-smoke.component';
import { SettingsComponent } from './features/settings/settings.component';
import { SmokesHistoryModule } from './features/smokes-history/smokes-history.module';
import { AuthModule } from './layout/auth/auth.module';
import { TopBarComponent } from './layout/top-bar/top-bar.component';
import { LazyDirective } from './shared/lazy.directive';
import { MaterialModule } from './shared/material.module';

@NgModule({
	declarations: [
		AppComponent,
		TopBarComponent,
		SettingsComponent,
		ISmokeComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		environment.production ? [] : AkitaNgDevtools.forRoot(),
		SmokesHistoryModule,
		AuthModule,
		CoreModule,
		MaterialModule,
		LazyDirective,
	],
	bootstrap: [AppComponent],
})
export class AppModule { }
