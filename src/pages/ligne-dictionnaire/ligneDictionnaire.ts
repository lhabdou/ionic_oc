import { UtilisateurService } from './../services/utilisateurService';
import { DictionnaireService } from './../services/dictionnaireService';
import { ILigneDictionnaire } from '../modeles/ligneDictionnaireModel';
import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-ligne-dictionnaire',
  templateUrl: 'ligneDictionnaire.html',
})
export class LigneDictionnairePage implements OnInit {
  name: string;

  ligne: ILigneDictionnaire;
  index:number;
  public notConnected:boolean;
  public loginPage = LoginPage; 

  constructor(private dictionnaireService: DictionnaireService, 
    private viewController:ViewController, private navParams: NavParams, private utilisateurService:UtilisateurService) {

  }

  ngOnInit() {
    
    this.index = this.navParams.get('ligneParam');
    this.ligne = this.dictionnaireService.dictionnaireList[this.index]; 
    this.notConnected = !this.utilisateurService.loginState;

  }
  onSubmitWord(form: NgForm) {

    console.log(form.value);
    this.viewController.dismiss();

  }

  accesValidation(): boolean {

    return true; 

  }

  accesContributeur(): boolean {

    return true; 

  }

}
