import { Overlay, OverlayConfig } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { Injectable, Injector } from "@angular/core";
import { ISmoke } from "src/app/core/smokes/smokes.store";
import { SmokeLabelComponent } from "../smoke-label/smoke-label.component";
import { LABELS_TOKEN, SmokeLabelPanelComponent } from "./smoke-label-panel.component";

@Injectable({ providedIn: 'root' })
export class SmokeLabelService {
	constructor(
		private overlay: Overlay,
		private injector: Injector
	) { }

	openLabel(labels: string[]): void {
		const overlayRef = this.overlay.create(this.getOverlayConfig());
		const injector = this.createInjector(labels);

		const portal = new ComponentPortal(SmokeLabelPanelComponent, null, injector);
		overlayRef.attach(portal);
	}

	private getOverlayConfig(): OverlayConfig {
		return {
			disposeOnNavigation: true,
			hasBackdrop: false,
			positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
			height: 200,
			width: 200,
		}
	}

	private createInjector(labels: string[]): Injector {
		return Injector.create({
			name: 'label-pabel',
			parent: this.injector,
			providers: [
				{ provide: LABELS_TOKEN, useValue: labels }
			]
		})
	}
}