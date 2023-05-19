import { Component, inject } from '@angular/core';
import { SmokesService } from 'src/app/core/smokes/smokes.service';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
	private service: SmokesService = inject(SmokesService);

	reset(): void {
		this.service.reset();
	}
}
