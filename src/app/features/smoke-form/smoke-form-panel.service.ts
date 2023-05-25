import { Dialog } from '@angular/cdk/dialog';
import { Injectable, InjectionToken } from '@angular/core';
import { filterNilValue } from '@datorama/akita';
import { Observable } from 'rxjs';
import { ISmoke } from 'src/app/core/smokes/smokes.store';
import { Action, SmokeFormComponent } from './smoke-form.component';

export const SMOKE_PANEL_TOKEN = new InjectionToken<ISmoke>('smoke for panel');

@Injectable({ providedIn: 'root' })
export class SmokeFormPanelService {
	constructor(private dialog: Dialog) {}

	openPanel(smoke: ISmoke): Observable<Action> {
		const ref = this.dialog.open<Action>(SmokeFormComponent, {
			hasBackdrop: true,
			providers: [{ provide: SMOKE_PANEL_TOKEN, useValue: { ...smoke, labels: {} } }],
		});

		return ref.closed.pipe(filterNilValue());
	}
}
