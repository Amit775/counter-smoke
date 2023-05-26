import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AgoPipe } from 'src/app/features/i-smoke/ago.pipe';
import { ISmokeComponent } from 'src/app/features/i-smoke/i-smoke.component';
import { SettingsComponent } from 'src/app/features/settings/settings.component';
import { SmokeFormModule } from 'src/app/features/smoke-form/smoke-form.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { NotNullPipe } from 'src/app/shared/not-null.pipe';

@NgModule({
	declarations: [SettingsComponent],
	imports: [
		CommonModule,
		MaterialModule,
		RouterModule.forChild([
			{ path: '', pathMatch: 'full', component: ISmokeComponent },
			{ path: 'settings', component: SettingsComponent },
			{
				path: 'history',
				loadChildren: () => import('src/app/features/smokes-history/smokes-history.module'),
			},
			{ path: '**', redirectTo: '' },
		]),
		AgoPipe,
		NotNullPipe,
		SmokeFormModule,
		ISmokeComponent,
	],
})
export default class HomeModule {}
