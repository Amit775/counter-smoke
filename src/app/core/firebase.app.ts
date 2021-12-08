// Import the functions you need from the SDKs you need
import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import { Database, getDatabase } from "firebase/database";
import { inject, InjectionToken } from "@angular/core";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseOptions = {
    apiKey: "AIzaSyD8WAPsGw6MdjVSpTEspfNPrkBfw2ZgyfE",
    authDomain: "counter-smoke.firebaseapp.com",
    databaseURL: "https://counter-smoke-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "counter-smoke",
    storageBucket: "counter-smoke.appspot.com",
    messagingSenderId: "668112789347",
    appId: "1:668112789347:web:e2831b12db0ac012143d56",
    measurementId: "${config.measurementId}"
};

export const FIREBASE_APP = new InjectionToken<FirebaseApp>('firebase app', { providedIn: 'root', factory: () => initializeApp(firebaseConfig) });

export const FIREBASE_DB = new InjectionToken<Database>('firebase database', {
    providedIn: 'root',
    factory: () => { const app = inject(FIREBASE_APP); return getDatabase(app) }
})