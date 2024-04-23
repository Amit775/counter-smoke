import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, computed, inject } from '@angular/core';
import { map, timer } from 'rxjs';
import { Service } from 'src/app/core/store/service';

import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from 'src/app/core/store';
import { SmokeContent, createEmptySmoke } from 'src/app/models/smoke';
import { SmokeLabelComponent } from '../smoke-form/smoke-label/smoke-label.component';
import { AgoPipe } from './ago.pipe';

@Component({
	standalone: true,
	selector: 'app-i-smoke',
	templateUrl: './i-smoke.component.html',
	styleUrls: ['./i-smoke.component.scss'],
	imports: [
		CommonModule,
		AgoPipe,
		SmokeLabelComponent,
		MatProgressSpinnerModule,
		MatButtonModule,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ISmokeComponent implements OnInit {
	private store = inject(Store);
	private service: Service = inject(Service);

	public emptySmoke: SmokeContent = createEmptySmoke();

	now = toSignal(timer(0, 1000 * 60).pipe(map(() => Date.now())), { initialValue: Date.now() });
	todayCount = this.store.countToday;
	lastCigareteDiff = computed(() => Math.max(this.now() - this.store.lastCigarette(), 0));

	loading = this.store.isLoading;

	ngOnInit(): void {
		if (this.store.shortcut.isFromShortcut()) {
			const label = this.store.shortcut.label();
			this.service.addSmokeNow(label ? { [label]: true } : {});
			this.service.setShortcut(false);
		}
	}

	inc(): void {
		this.service.addSmokeNow(this.emptySmoke.labels);
		this.emptySmoke = createEmptySmoke();
	}
}
