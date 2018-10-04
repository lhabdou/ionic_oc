import { Component } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { Platform } from 'ionic-angular/platform/platform';
import { ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { IUtilisateur } from '../pages/modeles/utilisateurModel';
import { LoginPage } from '../pages/login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { ToastController } from 'ionic-angular';
import { UtilisateurService } from '../pages/services/utilisateurService';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  isAuth = false;
  token: string;
  user: IUtilisateur;
  @ViewChild('content') content: NavController;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private afAuth: AngularFireAuth,
    private menuCtrl: MenuController, private userSrv:UtilisateurService, private toastCtrl: ToastController) {

    platform.ready().then(() => {

      afAuth.auth.onAuthStateChanged((userDetails) => {
        if (userDetails && userDetails.email) {
          userDetails.getIdToken().then((token) => {
            this.token = token;
            this.isAuth = true;
            this.userSrv.getUserProfil(this.token).then((userResult)=>{
              this.user = userResult;
              let toast = this.toastCtrl.create({
                message: this.user.nom + ' ' + this.user.prenom +  ', Bienvenu sur Kamusi',
                duration: 3000,
                position: 'top'
              });
              toast.present();
              this.content.setRoot(TabsPage);
            }).catch((error)=>{
              console.log("Erreur lors de récupération du profil utilisateur", error);
            });
            

          }).catch((error) => {

            console.log("Erreur lors de récupération du token", error);

          })


        } else {
          this.isAuth = false;
          let toast = this.toastCtrl.create({
            message: 'Vous n\'êtes pas connecté',
            duration: 2000,
            position: 'bottom'
          });
          toast.present();

        }

      })
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