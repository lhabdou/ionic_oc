import { AccessService } from './../services/accessService';
import { GestionPage } from './../gestion/gestion';
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
  gestionPage = GestionPage;
  myIndex: number;
  user:IUtilisateur;
  access:boolean = false;

  constructor(navParams: NavParams, private accessService:AccessService) {
    // Set the active tab based on the passed index from menu.ts
    this.user = navParams.get("user");
    this.myIndex = navParams.data.tabIndex || 0;
    if(this.user) {
      this.access = this.accessService.accesValidation(this.user);
    }

  }

}
