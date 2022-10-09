import { Overlay, OverlayConfig } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { Injectable } from "@angular/core";
import { ISmoke } from "src/app/core/smokes/smokes.store";
import { SmokeLabelComponent } from "./smoke-label.component";

@Injectable({ providedIn: 'root' })
export class SmokeLabelService {
	constructor(
		private overlay: Overlay
	) { }

	openLabel(smoke: ISmoke, origin: HTMLElement): void {
		const overlayRef = this.overlay.create(this.getOverlayConfig(origin));

		const portal = new ComponentPortal(SmokeLabelComponent);
		overlayRef.attach(portal);
	}

	private getOverlayConfig(origin: HTMLElement): OverlayConfig {
		return {
			disposeOnNavigation: true,
			hasBackdrop: false,
			positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
			height: 200,
			width: 200,
		}
	}
}