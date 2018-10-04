import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IUtilisateur } from "../modeles/utilisateurModel";
import { ENVIRONNEMENT } from "../../constantes/constantesUtilis";
@Injectable()
export class UtilisateurService {

  constructor(private httpClient: HttpClient) { }

  async getUserProfil(token: string) {

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "token": token
      })
    };

   await this.httpClient.get(
      ENVIRONNEMENT.URL_REST_LOCAL + "/utilisateurs/profil",
      httpOptions
    )
      .subscribe(
        (userBack:IUtilisateur) => {

          return userBack;
        },
        error => {
          console.log(
            "Erreur lors de la récupération d'un profil utilisateur",
            error
          );
        }
      );


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
        data => { },
        error => {
          console.log(
            "Erreur lors de l'enregistrement d'un utilisateur",
            error
          );
        }
      );
  }
}
