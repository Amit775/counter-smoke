import { enableProdMode, importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/app.routes';
import { environment } from './environments/environment';
import { MatSnackBarModule } from '@angular/material/snack-bar';

if (environment.production) {
	enableProdMode();
}

bootstrapApplication(AppComponent, {
	providers: [
		importProvidersFrom(BrowserModule, environment.production ? [] : AkitaNgDevtools.forRoot(), MatSnackBarModule),
		provideAnimations(),
		provideHttpClient(withInterceptorsFromDi()),
		provideRouter(APP_ROUTES),
	],
}).catch(err => console.error(err));
