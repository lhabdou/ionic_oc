import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';

@Injectable()
export class UtilisateurService {

  public loginState: boolean;
  constructor(private afAuth: AngularFireAuth) {

    this.afAuth.authState.subscribe(data => {

      if (data && data.email && data.uid) {
        
        this.loginState = true;

      }

    })

  }

}