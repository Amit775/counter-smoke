import { Component, Injectable, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

type SnackBarContent = {
	message: string;
	actions: { act: () => void; icon: string }[];
};

@Injectable({ providedIn: 'root' })
export class ToasterService {
	private snackbar: MatSnackBar = inject(MatSnackBar);

	ref: MatSnackBarRef<ToasterComponent> | undefined = undefined;

	public success(message: string, undo?: () => void): void {
		this.open(message, 'success', undo);
	}

	public error(message: string): void {
		this.open(message, 'error');
	}

	public warn(message: string): void {
		this.open(message, 'warn');
	}

	public info(message: string): void {
		this.open(message, 'info');
	}

	private open(message: string, panelClass: string, undo?: () => void): void {
		const actions = [
			{ icon: 'undo', act: undo ?? (() => console.log('undo')) },
			{ icon: 'close', act: () => this.ref?.dismiss() },
		];
		this.ref = this.snackbar.openFromComponent(ToasterComponent, {
			panelClass,
			data: { message, actions },
		});
	}
}

@Component({
	template: `
    <div class="container">
      <span class="message"> {{ data.message }} </span>
      <span class="actions">
        <button
          mat-icon-button
          *ngFor="let action of data.actions"
          (click)="action.act()"
        >
          <mat-icon>{{ action.icon }}</mat-icon>
        </button>
      </span>
    </div>
  `,
})
export class ToasterComponent {
	public data: SnackBarContent = inject(MAT_SNACK_BAR_DATA);
}
