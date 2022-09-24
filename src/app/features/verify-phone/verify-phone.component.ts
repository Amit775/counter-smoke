import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignInService } from 'src/app/layout/sign-in/sign-in.service';

@Component({
	selector: 'app-verify-phone',
	templateUrl: './verify-phone.component.html',
	styleUrls: ['./verify-phone.component.scss']
})
export class VerifyPhoneComponent implements AfterViewInit {
	readonly phonePattern = '^05[0234789][0-9]{7}&';

	constructor(
		private signInService: SignInService,
		private router: Router
	) { }

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
