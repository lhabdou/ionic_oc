import { AlertController } from "ionic-angular/components/alert/alert-controller";
import { SignupPage } from "./../pages/signup/signup";
import { Component } from "@angular/core";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { TabsPage } from "../pages/tabs/tabs";
import { Platform } from "ionic-angular/platform/platform";
import { ViewChild } from "@angular/core";
import { NavController } from "ionic-angular/navigation/nav-controller";
import { IUtilisateur } from "../pages/modeles/utilisateurModel";
import { UtilisateurService } from "../pages/services/utilisateurService";
import { LoginPage } from "../pages/login/login";
import { AngularFireAuth } from "angularfire2/auth";
import { MenuController } from "ionic-angular/components/app/menu-controller";
import { ToastController } from "ionic-angular";
import * as firebase from "firebase";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any = TabsPage;
  isAuth = false;
  token: string;
  emailNonVerifie: boolean = true;
  user: IUtilisateur;
  @ViewChild("content") content: NavController;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private userSrv: UtilisateurService,
    private afAuth: AngularFireAuth,
    private menuCtrl: MenuController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {
    platform.ready().then(() => {
      afAuth.auth.onAuthStateChanged(userData => {
        if (userData) {
          afAuth.auth.currentUser
            .getIdToken()
            .then(tokenResult => {
              this.token = tokenResult;
              this.emailNonVerifie = !userData.emailVerified;

              this.userSrv.getUserProfile(this.token).subscribe(userResult => {
                this.user = userResult;
                this.user.emailVerifie = userData.emailVerified;
                this.user.token = this.token;
                this.isAuth = true;
                let toast = this.toastCtrl.create({
                  message:
                    this.user.nom +
                    " " +
                    this.user.prenom +
                    ", Bienvenu sur Kamusi",
                  duration: 2000,
                  position: "top"
                });
                toast.present();
                this.content.setRoot(TabsPage, { user: this.user, isAuth: this.afAuth});
              });
            })
            .catch(error => {
              return "Erreur lors de la connexion" + error.message;
            });
        } else {
          this.isAuth = false;
          let toast = this.toastCtrl.create({
            message: "Vous n'êtes pas connecté",
            duration: 2000,
            position: "bottom"
          });
          toast.present();
        }
      });
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  doLogout() {
    this.menuCtrl.close();
    this.afAuth.auth.signOut();
    this.content.setRoot(TabsPage);
  }

  goToLoginPage() {
    this.menuCtrl.close();
    this.content.push(LoginPage);
  }

  editerProfil(user: IUtilisateur) {
    this.menuCtrl.close();
    this.content.push(SignupPage, { newUser: false, user: user });
  }

  sendEmailVerification() {
    firebase
      .auth()
      .currentUser.sendEmailVerification()
      .then(ok => {
        let alert = this.alertCtrl.create({
          title: "Email de confirmation",
          message:
            "Un email a été envoyé à votre adresse mail, merci de cliquer sur le lien pour confirmer votre adresse mail," +
            "N'oubliez pas d'actualiser l'application pour que la validation apparaisse",
          buttons: [
            {
              text: "OK",
              handler: () => {
                //nothing TODO
              }
            }
          ]
        });
        alert.present();
      });
  }
}
