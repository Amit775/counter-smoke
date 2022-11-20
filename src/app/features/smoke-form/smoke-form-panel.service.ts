import { Dialog, DialogConfig } from "@angular/cdk/dialog";
import { OverlayConfig } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { ElementRef, Injectable, InjectionToken, Injector } from "@angular/core";
import { from, map, Observable, of } from "rxjs";
import { ISmoke } from "src/app/core/smokes/smokes.store";
import { SmokeFormComponent } from "./smoke-form.component";

export const SMOKE_PANEL_TOKEN = new InjectionToken<ISmoke>('smoke for panel');

@Injectable({ providedIn: 'root' })
export class SmokeFormPanelService {
	constructor(
		private dialog: Dialog,
		private injector: Injector,
	) { }


	openPanel<R>(smoke: ISmoke, container: ElementRef, onClose: (result: R) => void): void {
		this.dialog.open(SmokeFormComponent, this.getDialogConfig(container))
	}

	getDialogConfig(container: ElementRef): DialogConfig {
		return {
			hasBackdrop: true,
		}
	}

	createPanelInjector(smoke: ISmoke): Injector {
		return Injector.create({
			providers: [{ provide: SMOKE_PANEL_TOKEN, useValue: smoke }],
			parent: this.injector,
			name: 'PanelInjector'
		})
	}
}