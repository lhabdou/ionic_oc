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

@NgModule({
  declarations: [
    MyApp,
    DictionnairePage,
    LigneDictionnairePage,
    SettingsPage, 
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DictionnairePage,
    LigneDictionnairePage,
    SettingsPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DictionnaireService
  ]
})
export class AppModule {}
