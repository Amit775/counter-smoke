import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
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
		
	]
})
export class MaterialModule { }