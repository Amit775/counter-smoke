import { AfterViewInit, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SignInService } from '../sign-in.service';

@Component({
	selector: 'app-verify-phone',
	templateUrl: './verify-phone.component.html',
	styleUrls: ['./verify-phone.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [MatFormFieldModule, MatInputModule, MatButtonModule],
})
export default class VerifyPhoneComponent implements AfterViewInit {
	readonly phonePattern = '^05[0234789][0-9]{7}&';

	private signInService: SignInService = inject(SignInService);
	private router: Router = inject(Router);

	ngAfterViewInit(): void {
		this.signInService.initVerifier();
	}

	sendSMS(phoneNumber: string): void {
		this.signInService.sendSMS(phoneNumber).subscribe((success: boolean) => {
			if (success) {
				this.router.navigate(['sign-in', 'code']);
			}
		});
	}

	setTestPhone(): void {
		this.sendSMS('0521234567');
	}
}
