import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SmokesHistoryComponent } from "./smokes-history.component";
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
    declarations: [SmokesHistoryComponent],
    imports: [
        CommonModule,
        MatListModule,
        MatIconModule,
        MatButtonModule
    ],
    exports: [
        SmokesHistoryComponent
    ]
})
export class SmokesHistoryModule { }