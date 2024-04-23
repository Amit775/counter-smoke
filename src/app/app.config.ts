import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from 'src/environments/environment';
import { APP_ROUTES } from './app.routes';

export const config: ApplicationConfig = {
	providers: [
		importProvidersFrom(BrowserModule, environment.production ? [] : AkitaNgDevtools.forRoot(), MatSnackBarModule),
		provideAnimations(),
		provideHttpClient(withInterceptorsFromDi()),
		provideRouter(APP_ROUTES),
	],
};
