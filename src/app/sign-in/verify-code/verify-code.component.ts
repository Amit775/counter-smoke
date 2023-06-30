import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SignInService } from '../sign-in.service';

@Component({
	selector: 'app-verify-code',
	templateUrl: './verify-code.component.html',
	styleUrls: ['./verify-code.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [MatFormFieldModule, MatInputModule, MatButtonModule],
})
export default class VerifyCodeComponent {
	readonly codePattern = '^[0-9]{6}&';

	private signInService: SignInService = inject(SignInService);
	private router: Router = inject(Router);

	verifyCode(code: string): void {
		this.signInService.verifyCode(code).subscribe((ok: boolean) => {
			if (ok) {
				this.router.navigate(['home']);
			}
		});
	}

	setTestCode(): void {
		this.verifyCode('123456');
	}
}
