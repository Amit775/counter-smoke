import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { MaterialModule } from "src/app/shared/material.module";
import { SmokeRecordComponent } from './smoke-record/smoke-record.component';
import { DialogComponent, SmokesHistoryComponent } from "./smokes-history.component";

@NgModule({
	declarations: [
		SmokesHistoryComponent,
		SmokeRecordComponent,
		DialogComponent,
	],
	imports: [
		CommonModule,
		RouterModule.forChild([
			{ path: '', component: SmokesHistoryComponent }
		]),
		MaterialModule,
		NgxMaterialTimepickerModule
	],
	exports: [
		SmokesHistoryComponent
	]
})
export class SmokesHistoryModule { }