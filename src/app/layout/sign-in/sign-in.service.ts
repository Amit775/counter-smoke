import { Injectable, Injector, inject } from '@angular/core';
import { applyTransaction } from '@datorama/akita';
import { FirebaseError } from 'firebase/app';
import {
	Auth,
	ConfirmationResult,
	RecaptchaVerifier,
	UserCredential,
	browserLocalPersistence,
	signInWithPhoneNumber,
} from 'firebase/auth';
import { Observable, catchError, from, map, of, switchMap } from 'rxjs';
import { FIREBASE_AUTH, FIREBASE_VERIFIER } from 'src/app/core/firebase.app';
import { SmokesService } from 'src/app/core/smokes/smokes.service';
import { ISmoker } from 'src/app/core/smokes/smokes.store';
import { ToasterService } from 'src/app/core/toaster.service';

declare var grecaptcha: any;

@Injectable({ providedIn: 'root', })
export class SignInService {
	private auth: Auth = inject(FIREBASE_AUTH);
	private injector: Injector = inject(Injector);
	private service: SmokesService = inject(SmokesService);
	private toaster: ToasterService = inject(ToasterService);

	verifier!: RecaptchaVerifier | undefined;
	confirmation: ConfirmationResult | undefined;

	initVerifier(): void {
		this.verifier = this.injector.get(FIREBASE_VERIFIER);
	}

	checkAuth(): void {
		this.auth.onAuthStateChanged((user) => {
			applyTransaction(() => {
				if (user != null) {
					this.service.setSmoker({ id: user.uid });
				}

				this.service.setIsInitialized();
			})
		});
	}

	sendSMS(phoneNumber: string): Observable<boolean> {
		phoneNumber = `+972${phoneNumber.slice(1)}`;
		return from(this.auth.setPersistence(browserLocalPersistence)).pipe(
			switchMap(() =>
				from(
					signInWithPhoneNumber(this.auth, phoneNumber, this.verifier!)
						.then((result: ConfirmationResult) => {
							this.confirmation = result;
							return true;
						})
						.catch((error) => {
							return (window as any).verifier
								.render()
								.then((id: any) => { console.log('reset', id); grecaptcha.reset(); })
								.then(() => this.fail(error.message));
						})
				)
			)
		);
	}

	verifyCode(code: string): Observable<boolean> {
		return from(this.confirmation!.confirm(code)).pipe(
			map((credential: UserCredential) => {
				const smoker: ISmoker = {
					id: credential.user.uid,
				};
				this.service.setSmoker(smoker);
				this.service.setIsInitialized();
				return this.pass('code confirmed successfully');
			}),
			catchError((error: FirebaseError) => {
				return of<boolean>(this.fail(error.message));
			})
		);
	}

	pass: (message: string) => true = (message: string) => {
		this.toaster.success(message);
		return true;
	};

	fail: (message: string) => false = (message: string) => {
		this.toaster.error(message);
		return false;
	};
}
