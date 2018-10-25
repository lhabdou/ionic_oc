import { UtilisateurService } from './../services/utilisateurService';
import { ENVIRONNEMENT } from './../../constantes/constantesUtilis';
import { MdpOubliePage } from './../mdp-oublie/mdp-oublie';
import { AngularFireAuth } from 'angularfire2/auth';
import { SignupPage } from './../signup/signup';
import { IUtilisateur } from './../modeles/utilisateurModel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TabsPage } from '../tabs/tabs';
import * as firebase from 'firebase';
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
  public navParams: NavParams, public fb: FormBuilder, private utilisateurService:UtilisateurService) {

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

      this.loginError = "Erreur de connexion! Vérifier les informations saisies";

    }


  }

  reinitialiserMdp() {

    this.navCtrl.push(MdpOubliePage);


  }

  signup() {

    this.navCtrl.push(SignupPage, { newUser: true , user : new IUtilisateur()});
  }

  loginWithGoogle() {

    var provider = new firebase.auth.GoogleAuthProvider();

    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    firebase.auth().signInWithPopup(provider).then(function(result) {
      // // This gives you a Google Access Token. You can use it to access the Google API.
      // result.user.getIdToken().then((token)=>{
      //   this.user.token = token;
      // },(error)=>{
      //   console.log("Erreur", error);
      // });
      // The signed-in user info.
      var userR = result.user;
      this.saveUser(userR);

      // ...
    }).catch(function(error) {
      // Handle Errors here.
      //var errorCode = error.code;
      //var errorMessage = error.message;
      // The email of the user's account used.
      //var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      //var credential = error.credential;
      // ...
    });


  }

 async saveUser(user:firebase.User) {

    this.user.email = user.email;
    this.user.nom = user.displayName;
    this.user.idUtilisateur = user.uid;
    this.user.role = ENVIRONNEMENT.roleContributeur;
    await user.getIdToken().then((token)=>{
      this.user.token = token;
    }, (error)=>{
      console.log("Erreur lors de la récupération du token gmail ", error);
    })
    this.user.urlImage = user.photoURL;

    this.utilisateurService.saveProfileUser(this.user, true);

  }

}
