import { AngularFireAuth } from "angularfire2/auth";
import { ToastController } from "ionic-angular";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IUtilisateur } from "../modeles/utilisateurModel";
import { ENVIRONNEMENT } from "../../constantes/constantesUtilis";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
@Injectable()
export class UtilisateurService {
  constructor(
    private afAuth: AngularFireAuth,
    private httpClient: HttpClient,
    private toastCtrl: ToastController
  ) {}

  getUserProfile(
    token: string,
    uid: string,
    user: IUtilisateur
  ): Observable<IUtilisateur> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        token: token,
        uid: uid
      })
    };

    return this.httpClient.post<IUtilisateur>(
      ENVIRONNEMENT.URL_REST_LOCAL + "/utilisateurs/profil",
      user,
      httpOptions
    );
  }

  saveProfileUser(user: IUtilisateur, newUser: boolean): Subscription {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Accept-Type": "application/json",
        token: user.token,
        uid: user.idUtilisateur
      })
    };

    if (newUser) {
      return this.httpClient
        .post<IUtilisateur>(
          ENVIRONNEMENT.URL_REST_LOCAL + "/utilisateurs/nouveau",
          user,
          httpOptions
        )
        .subscribe(
          data => {
            if (data) {
              this.afAuth.auth.signInWithEmailAndPassword(user.email, user.mdp);
            }
          },
          error => {
            return "Erreur lors de l'enregistrement d'un utilisateur";
          }
        );
    } else {
      return this.httpClient
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
        token: user.token,
        uid: user.idUtilisateur
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
          // Suppresion dans firebase
          this.afAuth.auth.currentUser.delete().then(() => {
            this.afAuth.auth.signOut();
          });

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
