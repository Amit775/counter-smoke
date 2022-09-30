import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "src/app/shared/material.module";
import { PanelService } from "./panel.service";
import { SmokeRecordComponent } from './smoke-record/smoke-record.component';
import { DialogComponent, SmokesHistoryComponent } from "./smokes-history.component";
import { SmokesListComponent } from './smokes-list/smokes-list.component';

@NgModule({
	declarations: [
		SmokesHistoryComponent,
		SmokeRecordComponent,
		DialogComponent,
		SmokesListComponent,
	],
	imports: [
		CommonModule,
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