import { IUtilisateur } from './../modeles/utilisateurModel';
import { DictionnairePage } from './../Dictionnaire/dictionnaire';
import { Component } from '@angular/core';
import { FaqCguPage } from '../faqCgu/faqCgu';
import { NavParams } from 'ionic-angular/navigation/nav-params';


@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  dictionnairePage = DictionnairePage;
  faqCguPage = FaqCguPage;
  myIndex: number;
  user:IUtilisateur;

  constructor(navParams: NavParams) {
    // Set the active tab based on the passed index from menu.ts
    this.user = navParams.get("user");
    this.myIndex = navParams.data.tabIndex || 0;

  }
}
