import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUtilisateur } from '../modeles/utilisateurModel';
import { AngularFireAuth } from 'angularfire2/auth';
import { ENVIRONNEMENT } from '../../constantes/constantesUtilis';
@Injectable()
export class UtilisateurService {

  user: IUtilisateur = {
    idUtilisateur: "",
    nom: "defaultName",
    prenom: "",
    email: ""
  };

  newUser: IUtilisateur = {
    nom: "Soilihi",
    prenom: "Abdoulhalim",
    mdp: "123456",
    pseudo: "lhabdou",
    email: "lhabdou26@hotmail.fr"
  }

  constructor(private afAuth: AngularFireAuth, private httpClient: HttpClient) {

  }

  getUserConnected(): IUtilisateur {

    if (this.afAuth.auth.currentUser) {
      this.user.idUtilisateur = this.afAuth.auth.currentUser.uid;
      this.user.nom = "Soilihi";
      this.user.email = this.afAuth.auth.currentUser.email;
      this.user.prenom = "Abdoul";

    }
    return this.user;
  }

  saveProfileUser(user: IUtilisateur) {

    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'uid': user.uid
        //'Authorization': 'my-auth-token'
      })
    };

    console.log(httpOptions.headers);
    
    this.httpClient.post(ENVIRONNEMENT.URL_REST_LOCAL + "/utilisateurs/nouveau", user, httpOptions)
      .subscribe(data => {

      }, error => {
        console.log(error); 
      });
  }

}