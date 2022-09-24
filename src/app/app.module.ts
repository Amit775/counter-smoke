import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LazyDirective } from './shared/lazy.directive';
import { MaterialModule } from './shared/material.module';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		environment.production ? [] : AkitaNgDevtools.forRoot(),
		AppRoutingModule,
		CoreModule,
		MaterialModule,
		LazyDirective,
	],
	bootstrap: [AppComponent],
})
export class AppModule { }
