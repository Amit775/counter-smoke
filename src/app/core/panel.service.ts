import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { Injectable, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PanelService {
	private overlay: Overlay = inject(Overlay);

	private ref: OverlayRef | undefined = undefined;
	private onCloseFns: (() => void)[] = [];

	public open<C>(portal: TemplatePortal<C> | ComponentPortal<C>, onClose: () => void): OverlayRef {
		this.close();

		this.ref = this.overlay.create(this.config());
		this.onCloseFns.push(onClose);

		this.ref.attach(portal);
		return this.ref;
	}

	public close(): void {
		if (this.ref == null) return;

		this.onCloseFns.forEach(fn => fn());
		this.onCloseFns = [];

		this.ref.detach();
		this.ref.dispose();

		this.ref = undefined;
	}

	private config(): OverlayConfig {
		return {
			hasBackdrop: true,
			positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
		};
	}
}
