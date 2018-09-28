import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { AngularFireAuth } from 'angularfire2/auth';
import { IUtilisateur } from './../pages/modeles/utilisateurModel';
import { Component } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { Platform } from 'ionic-angular/platform/platform';
import { ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { FirebaseApp } from 'angularfire2';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  user: IUtilisateur = {
    idUtilisateur: "1",
    nom: "",
    prenom: "",
    email: ""
  }

  @ViewChild('content') content: NavController;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private afAuth: AngularFireAuth, private menuCtrl: MenuController, private firebase: FirebaseApp) {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {

      if (!user) {
        this.rootPage = TabsPage;
        unsubscribe();
      } else {
        this.rootPage = TabsPage;
        unsubscribe();
      }
    })
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  doLogout(){
    return new Promise((resolve, reject) => {
      if(this.firebase.auth().currentUser){
        this.afAuth.auth.signOut()
        resolve();
      }
      else{
        reject();
      }
    });
}

