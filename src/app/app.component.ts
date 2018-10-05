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

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any = TabsPage;
  isAuth: boolean = false;
  token: string;
  user: IUtilisateur;
  @ViewChild("content")
  content: NavController;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private userSrv: UtilisateurService,
    private afAuth: AngularFireAuth,
    private menuCtrl: MenuController,
    private toastCtrl: ToastController
  ) {
    platform.ready().then(() => {
      afAuth.auth.onAuthStateChanged(user => {
        if (user) {
          afAuth.auth.currentUser
            .getIdToken()
            .then(tokenResult => {
              this.token = tokenResult;

              this.userSrv.getUserProfile(this.token).subscribe(userResult => {
                this.user = userResult;
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
                this.content.setRoot(TabsPage);
              });
            })
            .catch(error => {
              console.log("Erreur lors de la récupération du token", error);
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
  }

  goToLoginPage() {
    this.menuCtrl.close();
    this.content.push(LoginPage);
  }
}
