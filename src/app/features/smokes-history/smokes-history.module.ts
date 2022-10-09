import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "src/app/shared/material.module";
import { PanelService } from "./panel.service";
import { DialogComponent } from "./remove-dialog.component";
import { SmokeRecordComponent } from './smoke-record/smoke-record.component';
import { SmokesHistoryComponent } from "./smokes-history.component";
import { SmokesListComponent } from './smokes-list/smokes-list.component';
import { SmokeLabelComponent } from './smoke-label/smoke-label.component';
import { ReactiveFormsModule } from "@angular/forms";
import { JoinPipe } from "./smoke-label/join.pipe";

@NgModule({
	declarations: [
		SmokesHistoryComponent,
		SmokeRecordComponent,
		DialogComponent,
		SmokesListComponent,
		SmokeLabelComponent,
		JoinPipe
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