import { Inject, Injectable, Injector } from '@angular/core';
import { FirebaseError } from 'firebase/app';
import {
	Auth,
	browserLocalPersistence,
	ConfirmationResult,
	RecaptchaVerifier,
	signInWithPhoneNumber,
	UserCredential,
} from 'firebase/auth';
import { catchError, from, map, Observable, of, switchMap, tap } from 'rxjs';
import { FIREBASE_AUTH, FIREBASE_VERIFIER } from 'src/app/core/firebase.app';
import { SmokerService } from 'src/app/core/smoker/smoker.service';
import { ISmoker } from 'src/app/core/smoker/smoker.store';
import { ToasterService } from 'src/app/core/toaster.service';

declare var grecaptcha: any;

@Injectable({ providedIn: 'root', })
export class SignInService {
	verifier!: RecaptchaVerifier | undefined;
	confirmation: ConfirmationResult | undefined;

	constructor(
		@Inject(FIREBASE_AUTH) private auth: Auth,
		private injector: Injector,
		private smoker: SmokerService,
		private toaster: ToasterService
	) { }

	initVerifier(): void {
		this.verifier = this.injector.get(FIREBASE_VERIFIER);
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
				this.smoker.setSmoker(smoker);
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
