import { Overlay, OverlayConfig, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { ElementRef, Injectable, InjectionToken, Injector } from "@angular/core";
import { SmokesListComponent } from "./smokes-list/smokes-list.component";

export const DATE_PANEL_TOEKN = new InjectionToken<Date>('date for panel');

@Injectable()
export class PanelService {
	constructor(
		private overlay: Overlay,
		private injector: Injector
	) { }

	private overlayRef: OverlayRef | undefined;

	openPanel(date: Date, container: ElementRef, onClose: () => void): OverlayRef {
		this.closeOverlay();
		this.overlayRef = this.overlay.create(this.getOverlayConfig(container));
		const injector = this.createPanelInjector(date);
		const portal = new ComponentPortal(SmokesListComponent, null, injector);
		this.overlayRef.attach(portal);

		this.overlayRef.backdropClick().subscribe(_ => this.closeOverlay(onClose));
		return this.overlayRef;
	}

	closeOverlay(onClose?: () => void): void {
		onClose && onClose();
		this.overlayRef?.detach();
		this.overlayRef?.dispose();
		this.overlayRef = undefined;
	}

	getOverlayConfig(container: ElementRef): OverlayConfig {
		return {
			disposeOnNavigation: true,
			hasBackdrop: true,
			positionStrategy: this.overlay.position().flexibleConnectedTo(container).withPositions([{
				originX: "center",
				originY: "center",
				overlayX: "center",
				overlayY: "center",
				offsetY: 73,
			}])
		}
	}

	createPanelInjector(date: Date): Injector {
		return Injector.create({
			providers: [{ provide: DATE_PANEL_TOEKN, useValue: date }],
			parent: this.injector,
			name: 'PanelInjector'
		})
	}
}