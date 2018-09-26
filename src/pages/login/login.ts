import { AngularFireAuth } from 'angularfire2/auth';
import { SignupPage } from './../signup/signup';
import { IUtilisateur } from './../modeles/utilisateurModel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public user = {} as IUtilisateur;
  messageLogin:string;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  login(user: IUtilisateur) {

    try {

      const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.mdp);
      
      console.log(result);

    } catch (e) {

      console.error(e.message);

      this.messageLogin = e.message;
      
    }

  }
  signup() {
    this.navCtrl.push(SignupPage);
  }

}
