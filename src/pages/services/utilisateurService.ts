import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { IUtilisateur } from '../modeles/utilisateurModel';

@Injectable()
export class UtilisateurService {

  user:IUtilisateur = {
    idUtilisateur:"",
    nom:"defaultName",
    prenom:"",
    email:""
  };
  public loginState: boolean = false;
  constructor(private afAuth: AngularFireAuth) {}

  getUserConnected():IUtilisateur {

    if(this.afAuth.auth.currentUser) {
      this.loginState = true;
      console.log("Email connecté" + this.afAuth.auth.currentUser.email);
      this.user.idUtilisateur = this.afAuth.auth.currentUser.uid;
      this.user.nom = this.afAuth.auth.currentUser.displayName; 
      this.user.email = this.afAuth.auth.currentUser.email; 
      this.user.prenom = "Abdoul";

    } 
    return this.user; 
  }

}