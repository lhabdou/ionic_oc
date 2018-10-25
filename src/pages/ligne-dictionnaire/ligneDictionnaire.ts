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
  public loginPage = LoginPage;
  resultatsLigne:any;

  constructor(private viewController:ViewController, private navParams: NavParams) {

  }

  ngOnInit() {

    this.ligne = this.navParams.get('ligneParam');

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
