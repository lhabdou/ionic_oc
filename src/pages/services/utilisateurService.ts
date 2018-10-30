import { AngularFireAuth } from "angularfire2/auth";
import { ToastController } from "ionic-angular";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IUtilisateur } from "../modeles/utilisateurModel";
import { ENVIRONNEMENT } from "../../constantes/constantesUtilis";
import { Observable } from "rxjs/Observable";
@Injectable()
export class UtilisateurService {
  constructor(
    private afAuth: AngularFireAuth,
    private httpClient: HttpClient,
    private toastCtrl: ToastController
  ) {}

  getUserProfile(token: string): Observable<IUtilisateur> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        token: token
      })
    };

    return this.httpClient.get<IUtilisateur>(
      ENVIRONNEMENT.URL_REST_LOCAL + "/utilisateurs/profil",
      httpOptions
    );
  }

  saveProfileUser(user: IUtilisateur, newUser: boolean) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Accept-Type": "application/json",
        token: user.token
      })
    };

    if (newUser) {
      this.httpClient
        .post<IUtilisateur>(
          ENVIRONNEMENT.URL_REST_LOCAL + "/utilisateurs/nouveau",
          user,
          httpOptions
        )
        .subscribe(
          data => {
            this.afAuth.auth.signInWithEmailAndPassword(user.email, user.mdp);
          },
          error => {
            return "Erreur lors de l'enregistrement d'un utilisateur";
          }
        );
    } else {
      this.httpClient
        .put<IUtilisateur>(
          ENVIRONNEMENT.URL_REST_LOCAL + "/utilisateurs/maj",
          user,
          httpOptions
        )
        .subscribe(
          data => {
            data.mdp = "";
          },
          error => {
            return "Erreur lors de la modification d'un utilisateur";
          }
        );
    }
  }

  supprimerUtilisateur(user: IUtilisateur) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Accept-Type": "application/json",
        token: user.token
      })
    };

    this.httpClient
      .delete(
        ENVIRONNEMENT.URL_REST_LOCAL +
          "/utilisateurs/supprimer/" +
          user.idUtilisateur,
        httpOptions
      )
      .subscribe(
        data => {
          let toast = this.toastCtrl.create({
            message: "Votre profil est bien supprimé",
            duration: 2000,
            position: "bottom"
          });
          toast.present();
        },
        error => {
          return "Erreur lors de la suppression de l'utilisateur";
        }
      );
  }
}
