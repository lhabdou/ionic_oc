import { Injectable } from '@angular/core';
import { IUtilisateur } from '../modeles/utilisateurModel';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class UtilisateurService {

  user:IUtilisateur = {
    idUtilisateur:"",
    nom:"defaultName",
    prenom:"",
    email:""
  };

  constructor (private afAuth:AngularFireAuth) {

  }

  getUserConnected():IUtilisateur {

     if(this.afAuth.auth.currentUser) {
      this.user.idUtilisateur = this.afAuth.auth.currentUser.uid;
      this.user.nom = "Soilihi"; 
      this.user.email = this.afAuth.auth.currentUser.email; 
      this.user.prenom = "Abdoul";

    } 
    return this.user; 
  }

}