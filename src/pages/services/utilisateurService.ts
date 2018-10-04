import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IUtilisateur } from "../modeles/utilisateurModel";
import { AngularFireAuth } from "angularfire2/auth";
import { ENVIRONNEMENT } from "../../constantes/constantesUtilis";
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
  };

  constructor(
    private afAuth: AngularFireAuth,
    private httpClient: HttpClient
  ) {}

  getUserConnected(): IUtilisateur {
    if (this.afAuth.auth.currentUser) {
      return this.getUserProfile(this.afAuth.auth.currentUser.email);
    }
  }

  getUserProfile(email: string): IUtilisateur {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        token: this.user.token
      })
    };

    this.httpClient.get(
      ENVIRONNEMENT.URL_REST_LOCAL + "/utilisateurs/profil",
      httpOptions
    )
    .subscribe(
      (userBack:IUtilisateur) => {
        this.user = userBack;
      },
      error => {
        console.log(
          "Erreur lors de la récupération d'un profil utilisateur",
          error
        );
        console.log("mak")
      }
    ).closed;


    return this.user;
  }

  saveProfileUser(user: IUtilisateur) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Accept-Type": "application/json",
        token: user.token
      })
    };

    this.httpClient
      .post(
        ENVIRONNEMENT.URL_REST_LOCAL + "/utilisateurs/nouveau",
        user,
        httpOptions
      )
      .subscribe(
        data => {},
        error => {
          console.log(
            "Erreur lors de l'enregistrement d'un utilisateur",
            error
          );
        }
      );
  }
}
