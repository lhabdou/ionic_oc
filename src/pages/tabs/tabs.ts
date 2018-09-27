import { DictionnairePage } from './../Dictionnaire/dictionnaire';
import { Component } from '@angular/core';
import { SettingsPage } from '../settings/settings';
import { NavParams } from 'ionic-angular/navigation/nav-params';


@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  dictionnairePage = DictionnairePage; 
  settingsPage = SettingsPage; 
  myIndex: number;
 
  constructor(navParams: NavParams) {
    // Set the active tab based on the passed index from menu.ts
    this.myIndex = navParams.data.tabIndex || 0;
  }
}
