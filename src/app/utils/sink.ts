import { TeardownLogic } from 'rxjs';

export class DisposerSink {
	private disposes: TeardownLogic[] = [];
	public set sink(teardown: TeardownLogic) {
		this.disposes.push(teardown);
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
