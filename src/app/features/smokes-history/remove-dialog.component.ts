import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
	standalone: true,
	imports: [MatDialogModule, MatButtonModule],
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
export class RemoveDialogComponent {}
