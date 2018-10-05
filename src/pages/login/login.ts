import { AngularFireAuth } from 'angularfire2/auth';
import { SignupPage } from './../signup/signup';
import { IUtilisateur } from './../modeles/utilisateurModel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TabsPage } from '../tabs/tabs';
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
  public navParams: NavParams, public fb: FormBuilder) {

    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

  }

  async login(user: IUtilisateur) {

    try {

      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.mdp);

      if (result) {
        result.user.getIdToken().then((token)=>{
          this.user.token = token;
        }).catch((error)=>{
          console.log("Erreur lors de la récupération du token", error);
        })
        this.navCtrl.setRoot(TabsPage);
      }

    } catch (error) {

      this.loginError = error.message;

    }


  }
  signup() {

    this.navCtrl.push(SignupPage, { newUser: true , user : new IUtilisateur()});
  }

  loginWithGoogle() {

  }

}
