import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
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

@NgModule({
	declarations: [
		AppComponent,
		ISmokeComponent,
		TopBarComponent,
		SettingsComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		MatButtonModule,
		MatProgressSpinnerModule,
		MatTabsModule,
		MatIconModule,
		MatSnackBarModule,
		environment.production ? [] : AkitaNgDevtools.forRoot(),
		SmokesHistoryModule,
		AuthModule,
		CoreModule,
	],
	bootstrap: [AppComponent],
})
export class AppModule { }
