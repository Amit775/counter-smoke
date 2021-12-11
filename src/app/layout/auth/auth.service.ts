import { Inject, Injectable, Injector } from '@angular/core';
import {
  Auth,
  browserLocalPersistence,
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  UserCredential,
} from 'firebase/auth';
import { from, map, Observable, switchMap, tap } from 'rxjs';
import { FIREBASE_AUTH, FIREBASE_VERIFIER } from 'src/app/core/firebase.app';
import { SmokerService } from 'src/app/core/smoker/smoker.service';
import { ISmoker } from 'src/app/core/smoker/smoker.store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  verifier!: RecaptchaVerifier | undefined;
  confirmation: ConfirmationResult | undefined;

  constructor(
    @Inject(FIREBASE_AUTH) private auth: Auth,
    private injector: Injector,
    private smoker: SmokerService
  ) {}

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
              console.error(error);
              throw error;
            })
        )
      )
    );
  }

  verifyCode(code: string): Observable<boolean> {
    return from(this.confirmation!.confirm(code)).pipe(
      tap((credential: UserCredential) => {
        const smoker: ISmoker = {
          id: credential.user.uid,
        };
        this.smoker.setSmoker(smoker);
      }),
      map(() => true)
    );
  }
}
