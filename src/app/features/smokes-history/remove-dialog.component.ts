import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MaterialModule } from 'src/app/shared/material.module';

@Component({
	standalone: true,
	imports: [MaterialModule],
	template: `
		<div class="container">
			<span mat-dialog-title>Are you sure you want to remove that smoke?</span>
			<div mat-dialog-actions>
				<button mat-button [mat-dialog-close]="false">No</button>
				<button mat-button [mat-dialog-close]="true" color="warn">Yes</button>
			</div>
		</div>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {}
