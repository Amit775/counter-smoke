import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material.module';
import { SmokeLabelComponent } from '../smoke-form/smoke-label/smoke-label.component';
import { SmokesHistoryComponent } from './smokes-history.component';
import { SmokesListComponent } from './smokes-list/smokes-list.component';

@NgModule({
	declarations: [SmokesHistoryComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		RouterModule.forChild([{ path: '', component: SmokesHistoryComponent }]),
		MaterialModule,
		SmokeLabelComponent,
		SmokesListComponent,
	],
	exports: [SmokesHistoryComponent],
})
export default class SmokesHistoryModule {}
