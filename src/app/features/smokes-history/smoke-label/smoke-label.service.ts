import { Overlay, OverlayConfig, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { Injectable } from "@angular/core";
import { map, merge, Observable } from "rxjs";
import { SmokeLabelComponent } from "./smoke-label.component";

@Injectable({ providedIn: 'root' })
export class SmokeLabelService {
	constructor(
		private overlay: Overlay,
	) { }

	private overlayRef: OverlayRef | undefined;

	openLabel(labels: string[], origin: HTMLElement): Observable<{ action: string, value: string }> {

		this.closeOverlay();
		this.overlayRef = this.overlay.create(this.getOverlayConfig(origin));
		const portal = new ComponentPortal(SmokeLabelComponent);

		const componentRef = this.overlayRef.attach(portal);
		this.overlayRef.backdropClick().subscribe(_ => this.closeOverlay());

		const added$ = componentRef.instance.added;
		const removed$ = componentRef.instance.removed;
		return merge(
			added$.pipe(map(value => ({ action: 'add', value }))),
			removed$.pipe(map(value => ({ action: 'remove', value })))
		);
	}

	private closeOverlay(): void {
		console.log('close');
		this.overlayRef?.detach();
		this.overlayRef?.dispose();
		this.overlayRef = undefined;
	}

	private getOverlayConfig(origin: HTMLElement): OverlayConfig {
		return {
			disposeOnNavigation: true,
			hasBackdrop: true,
			positionStrategy: this.overlay.position().flexibleConnectedTo(origin).withPositions([
				{ originX: "center", overlayX: "center", originY: "bottom", overlayY: "top", offsetX: 25, offsetY: 20 }
			]),
			height: 200,
			width: 200,
		}
	}
}