import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Auth } from 'firebase/auth';
import { FIREBASE_AUTH } from 'src/app/core/firebase.app';
import { Service } from 'src/app/core/store/service';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
})
export default class SettingsComponent {
	private service: Service = inject(Service);
	private auth: Auth = inject(FIREBASE_AUTH);
	public phone = this.auth.currentUser?.phoneNumber;

	logOut(): void {
		this.auth.signOut();
		location.reload();
	}

	reset(): void {
		this.service.reset();
	}
}
