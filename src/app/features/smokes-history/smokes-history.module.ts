import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DialogComponent, SmokesHistoryComponent } from "./smokes-history.component";
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { SmokeRecordComponent } from './smoke-record/smoke-record.component';
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { MatExpansionModule } from '@angular/material/expansion';
import { SortPipe } from "./sort.pipe";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "src/app/shared/material.module";

@NgModule({
    declarations: [
        SmokesHistoryComponent, 
        SmokeRecordComponent,
        DialogComponent,
		SortPipe
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