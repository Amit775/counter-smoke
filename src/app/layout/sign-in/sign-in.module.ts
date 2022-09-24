import { NgModule } from "@angular/core";

import { VerifyPhoneComponent } from "src/app/features/verify-phone/verify-phone.component";
import { VerifyCodeComponent } from "src/app/features/verify-code/verify-code.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "src/app/shared/material.module";

@NgModule({
	declarations: [
		VerifyPhoneComponent,
		VerifyCodeComponent,
	],
	imports: [
		CommonModule,
		MaterialModule,
		RouterModule.forChild([
			{ path: 'phone', component: VerifyPhoneComponent },
			{ path: 'code', component: VerifyCodeComponent },
			{ path: '**', redirectTo: 'phone' }
		])
	]
})
export class SignInModule { }