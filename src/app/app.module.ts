import { firebaseConfig } from './../app.firebase.config';
import { AuthService } from './../pages/services/auth.service';
import { UtilisateurService } from './../pages/services/utilisateurService';
import { LoginPage } from './../pages/login/login';
import { DictionnaireService } from './../pages/services/dictionnaireService';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { LigneDictionnairePage } from './../pages/ligne-dictionnaire/ligneDictionnaire';
import { DictionnairePage } from './../pages/Dictionnaire/dictionnaire';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { SettingsPage } from '../pages/settings/settings';
import { TabsPage } from '../pages/tabs/tabs';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
@NgModule({
  declarations: [
    MyApp,
    DictionnairePage,
    LigneDictionnairePage,
    SettingsPage, 
    LoginPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig.fire)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DictionnairePage,
    LigneDictionnairePage,
    SettingsPage,
    LoginPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DictionnaireService,
    AngularFireAuth,
    AuthService,
    UtilisateurService
  ]
})
export class AppModule {}
