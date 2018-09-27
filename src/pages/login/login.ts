import { AngularFireAuth } from 'angularfire2/auth';
import { SignupPage } from './../signup/signup';
import { IUtilisateur } from './../modeles/utilisateurModel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DictionnairePage } from '../Dictionnaire/dictionnaire';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public user = {} as IUtilisateur;
  loginForm: FormGroup;
  loginError: string;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController,
    private toast: ToastController, public navParams: NavParams, public fb: FormBuilder) {

    this.loginForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

  }

  async login(user: IUtilisateur) {

    try {

      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.mdp);

      if (result) {

        this.navCtrl.setRoot(DictionnairePage);

        this.toast.create({
          message: 'Vous êtes à présent connecter sur Kamusi',
          duration: 3000
        })

      }


    } catch (error) {

      this.loginError = error.message;


    }

  }
  signup() {
    this.navCtrl.push(SignupPage);
  }

  loginWithGoogle() {

  }

}
