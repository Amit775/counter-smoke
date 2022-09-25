// Import the functions you need from the SDKs you need
import { inject, InjectionToken } from '@angular/core';
import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app';
import { Auth, getAuth, RecaptchaVerifier } from 'firebase/auth';
import { Database, getDatabase } from 'firebase/database';

const firebaseConfig: FirebaseOptions = {
	apiKey: 'AIzaSyD8WAPsGw6MdjVSpTEspfNPrkBfw2ZgyfE',
	authDomain: 'counter-smoke.firebaseapp.com',
	databaseURL:
		'https://counter-smoke-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'counter-smoke',
	storageBucket: 'counter-smoke.appspot.com',
	messagingSenderId: '668112789347',
	appId: '1:668112789347:web:e2831b12db0ac012143d56',
	measurementId: '${config.measurementId}',
};

export const FIREBASE_APP = new InjectionToken<FirebaseApp>('firebase app', {
	providedIn: 'root',
	factory: () => initializeApp(firebaseConfig),
});

export const FIREBASE_DB = new InjectionToken<Database>('firebase database', {
	providedIn: 'root',
	factory: () => {
		const app = inject(FIREBASE_APP);
		return getDatabase(app);
	},
});

export const FIREBASE_AUTH = new InjectionToken<Auth>('firebase auth', {
	providedIn: 'root',
	factory: () => {
		const app = inject(FIREBASE_APP);
		return getAuth(app);
	},
});

export const FIREBASE_VERIFIER = new InjectionToken<RecaptchaVerifier | undefined>('firebase verifier', {
	providedIn: 'root',
	factory: () => {
		const auth = inject(FIREBASE_AUTH);
		try {
			const verifier = new RecaptchaVerifier(
				'sign-in-button',
				{ size: 'invisible' },
				auth
			);
			(window as any).verifier = verifier;
			return verifier;
		} catch (error) {
			console.error(error);
		}

		return undefined;
	},
});
