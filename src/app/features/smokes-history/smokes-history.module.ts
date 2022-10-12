import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "src/app/shared/material.module";
import { PanelService } from "./panel.service";
import { DialogComponent } from "./remove-dialog.component";
import { SmokeLabelPanelComponent } from './smoke-label-panel/smoke-label-panel.component';
import { SmokeLabelComponent } from './smoke-label/smoke-label.component';
import { JoinPipe } from "./smoke-record/join.pipe";
import { SmokeRecordComponent } from './smoke-record/smoke-record.component';
import { SmokesHistoryComponent } from "./smokes-history.component";
import { SmokesListComponent } from './smokes-list/smokes-list.component';

@NgModule({
	declarations: [
		SmokesHistoryComponent,
		SmokeRecordComponent,
		DialogComponent,
		SmokesListComponent,
		SmokeLabelComponent,
		JoinPipe,
		SmokeLabelPanelComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		RouterModule.forChild([
			{ path: '', component: SmokesHistoryComponent }
		]),
		MaterialModule,
	],
	exports: [
		SmokesHistoryComponent
	],
	providers: [
		PanelService
	]
})
export class SmokesHistoryModule { }