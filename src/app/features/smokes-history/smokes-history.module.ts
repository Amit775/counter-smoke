import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material.module';
import { SmokeLabelComponent } from '../smoke-form/smoke-label/smoke-label.component';
import { PanelService } from './panel.service';
import { DialogComponent } from './remove-dialog.component';
import { JoinPipe } from './smoke-record/join.pipe';
import { SmokeRecordComponent } from './smoke-record/smoke-record.component';
import { SmokesHistoryComponent } from './smokes-history.component';
import { SmokesListComponent } from './smokes-list/smokes-list.component';

@NgModule({
	declarations: [SmokesHistoryComponent, SmokeRecordComponent, DialogComponent, SmokesListComponent, JoinPipe],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		RouterModule.forChild([{ path: '', component: SmokesHistoryComponent }]),
		MaterialModule,
		SmokeLabelComponent,
	],
	exports: [SmokesHistoryComponent],
	providers: [PanelService],
})
export default class SmokesHistoryModule {}
