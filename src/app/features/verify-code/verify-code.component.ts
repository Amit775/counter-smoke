import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignInService } from 'src/app/layout/sign-in/sign-in.service';

@Component({
	selector: 'app-verify-code',
	templateUrl: './verify-code.component.html',
	styleUrls: ['./verify-code.component.scss']
})
export class VerifyCodeComponent {
	readonly codePattern = '^[0-9]{6}&';

	constructor(
		private signInService: SignInService,
		private router: Router
	) { }

	verifyCode(code: string): void {
		this.signInService.verifyCode(code).subscribe(ok => {
			if (ok) {
				this.router.navigate(['home']);
			}
		});
	}

	setTestCode(): void {
		this.verifyCode('123456');
	}
}
