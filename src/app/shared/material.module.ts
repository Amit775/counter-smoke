import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTabsModule } from "@angular/material/tabs";

@NgModule({
	exports: [
		MatButtonModule,
		MatProgressSpinnerModule,
		MatTabsModule,
		MatIconModule,
		MatSnackBarModule,
		MatFormFieldModule,
		MatInputModule,
		MatListModule,
		MatDialogModule,
		MatExpansionModule,
	]
})
export class MaterialModule { }