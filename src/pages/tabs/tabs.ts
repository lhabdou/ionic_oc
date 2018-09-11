import { DictionnairePage } from './../Dictionnaire/dictionnaire';
import { Component } from '@angular/core';
import { SettingsPage } from '../settings/settings';


@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  dictionnairePage = DictionnairePage; 
  settingsPage = SettingsPage; 

}
