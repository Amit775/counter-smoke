import { Component } from '@angular/core';
import { SmokesService } from 'src/app/core/smokes/smokes.service';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
	constructor(private service: SmokesService) { }

	reset(): void {
		this.service.reset();
	}
}
