import { UtilisateurService } from './../services/utilisateurService';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { IPage } from '../modeles/pageModel';
@Component({
  selector: 'page-menu-user',
  templateUrl: 'menu-user.html',
})
export class MenuUserPage {

  rootPage = TabsPage;
  
  @ViewChild(Nav) nav:Nav;
  connected:boolean = false; 

  pages: IPage[] = [
    { title: 'Kamusi FR-COM', pageName: 'Dictionnaire', tabComponent: 'DictionnairePage', index: 0, icon: 'book' },
    { title: 'Réglages', pageName: 'Réglages', tabComponent: 'SettingsPage', index: 1, icon: 'settings' }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, private utilisateurService:UtilisateurService) {

  }


  ngOnInit(): void {

    this.connected = this.utilisateurService.loginState;

  }

  openPage(page: IPage) {
    let params = {};
 
    // The index is equal to the order of our tabs inside tabs.ts
    if (page.index) {
      params = { tabIndex: page.index };
    }
 
    // The active child nav is our Tabs Navigation
    if (this.nav.getActiveChildNav() && page.index != undefined) {
      this.nav.getActiveChildNav().select(page.index);
    } else {
      // Tabs are not active, so reset the root page 
      // In this case: moving to or from SpecialPage
      this.nav.setRoot(page.pageName, params);
    }
  }
 
  isActive(page: IPage) {
    // Again the Tabs Navigation
    let childNav = this.nav.getActiveChildNav();
 
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }
 
    // Fallback needed when there is no active childnav (tabs not active)
    if (this.nav.getActive() && this.nav.getActive().name === page.pageName) {
      return 'primary';
    }
    return;
  }

}
