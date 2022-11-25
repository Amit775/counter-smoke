import { Dialog } from "@angular/cdk/dialog";
import { Injectable, InjectionToken } from "@angular/core";
import { ISmoke } from "src/app/core/smokes/smokes.store";
import { SmokeFormComponent } from "./smoke-form.component";

export const SMOKE_PANEL_TOKEN = new InjectionToken<ISmoke>('smoke for panel');

@Injectable({ providedIn: 'root' })
export class SmokeFormPanelService {
	constructor(
		private dialog: Dialog,
	) { }

	openPanel<R>(smoke: ISmoke): void {
		this.dialog.open(SmokeFormComponent, {
			hasBackdrop: true,
			providers: [{ provide: SMOKE_PANEL_TOKEN, useValue: smoke }]
		});
	}
}