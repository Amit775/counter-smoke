import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Auth } from 'firebase/auth';
import { FIREBASE_AUTH } from 'src/app/core/firebase.app';
import { SmokesService } from 'src/app/core/smokes/smokes.service';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
})
export default class SettingsComponent {
	private service: SmokesService = inject(SmokesService);
	private auth: Auth = inject(FIREBASE_AUTH);

	logOut(): void {
		this.auth.signOut();
		location.reload();
	}

	reset(): void {
		this.service.reset();
	}
}
