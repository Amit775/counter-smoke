import { DestroyRef, inject } from '@angular/core';
import { TeardownLogic } from 'rxjs';

export class DisposerSink {
	private destroyRef = inject(DestroyRef).onDestroy(() => this.dispose());

	private disposes: TeardownLogic[] = [];
	public set sink(teardown: TeardownLogic) {
		this.disposes.push(teardown);
	}

	public add(teardown: TeardownLogic | TeardownLogic[]): this {
		teardown = Array.isArray(teardown) ? teardown : [teardown];
		this.disposes.push(...teardown);
		return this;
	}

	public dispose(): void {
		this.disposes.forEach(subscription => {
			if (typeof subscription === 'undefined') return;
			if (typeof subscription === 'function') return subscription();

			subscription.unsubscribe();
		});
		this.disposes = [];
	}
}
