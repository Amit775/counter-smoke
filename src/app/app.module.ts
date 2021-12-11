import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ISmokeComponent } from './features/i-smoke/i-smoke.component';
import { SmokesHistoryComponent } from './features/smokes-history/smokes-history.component';
import { NG_ENTITY_SERVICE_CONFIG } from '@datorama/akita-ng-entity-service';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../environments/environment';
import { TopBarComponent } from './layout/top-bar/top-bar.component';
import { SettingsComponent } from './features/settings/settings.component';
import { SmokesHistoryModule } from './features/smokes-history/smokes-history.module';
import { AuthModule } from './layout/auth/auth.module';

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
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    SmokesHistoryModule,
    AuthModule,
  ],
  providers: [
    {
      provide: NG_ENTITY_SERVICE_CONFIG,
      useValue: { baseUrl: 'https://jsonplaceholder.typicode.com' },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
