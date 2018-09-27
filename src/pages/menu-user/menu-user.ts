import { UtilisateurService } from './../services/utilisateurService';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
@Component({
  selector: 'page-menu-user',
  templateUrl: 'menu-user.html',
})
export class MenuUserPage {

  public rootPage = MenuUserPage; 
  connected:boolean = false; 

  constructor(public navCtrl: NavController, public navParams: NavParams, private utilisateurService:UtilisateurService) {

  }

  ngOnInit(): void {

    this.connected = this.utilisateurService.loginState;

}

}
