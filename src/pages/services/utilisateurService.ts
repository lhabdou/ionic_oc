import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IUtilisateur } from "../modeles/utilisateurModel";
import { ENVIRONNEMENT } from "../../constantes/constantesUtilis";
import { Observable } from "rxjs/Observable";
@Injectable()
export class UtilisateurService {

  constructor(private httpClient: HttpClient) {}

  getUserProfile(token: string): Observable<IUtilisateur> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "token": token
      })
    };

   return this.httpClient.get<IUtilisateur>(
      ENVIRONNEMENT.URL_REST_LOCAL + "/utilisateurs/profil",
      httpOptions
    );

  }

  saveProfileUser(user: IUtilisateur) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Accept-Type": "application/json",
        "token": user.token
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
