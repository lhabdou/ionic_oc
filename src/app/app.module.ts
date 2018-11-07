import { LigneDictionnaireModificationPage } from './../pages/ligne-dictionnaire/modification/ligneDictionnaireModification';
import { PaysService } from './../pages/services/paysService';
import { MdpOubliePage } from './../pages/mdp-oublie/mdp-oublie';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { SignupPage } from './../pages/signup/signup';
import { AngularFireAuth } from 'angularfire2/auth';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { AngularFireModule } from 'angularfire2';
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
import { FaqCguPage } from '../pages/faqCgu/faqCgu';
import { TabsPage } from '../pages/tabs/tabs';
import { AngularFireAuthModule } from 'angularfire2/auth';
@NgModule({
  declarations: [
    MyApp,
    DictionnairePage,
    LigneDictionnairePage,
    LigneDictionnaireModificationPage,
    FaqCguPage,
    LoginPage,
    SignupPage,
    TabsPage,
    MdpOubliePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    NgxErrorsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DictionnairePage,
    LigneDictionnairePage,
    LigneDictionnaireModificationPage,
    FaqCguPage,
    LoginPage,
    SignupPage,
    TabsPage,
    MdpOubliePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    HttpClient,
    AngularFireAuth,
    DictionnaireService,
    UtilisateurService,
    PaysService
  ]
})
export class AppModule { }
