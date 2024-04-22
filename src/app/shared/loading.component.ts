import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, MatProgressSpinnerModule],
	template: '<div class="wrapper"><mat-spinner /></div>',
	styles: [
		`
			.wrapper {
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			:host {
				height: 100%;
			}
		`,
	],
})
export default class LoadingComponent {}
