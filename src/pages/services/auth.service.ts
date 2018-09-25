import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthService {
    isAuth = false; 

	constructor(public afAuth: AngularFireAuth) {
		afAuth.authState.subscribe(user => {
			if(user) {
                this.isAuth = true; 
            } else {
                this.isAuth = false; 
            }
        });
        
        
	}

	signInWithEmail(credentials) {
		console.log('Sign in with email');
		return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
			 credentials.password);
	}

}