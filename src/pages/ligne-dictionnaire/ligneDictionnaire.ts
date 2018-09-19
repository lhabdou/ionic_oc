import { DictionnaireService } from './../services/dictionnaireService';
import { ILigneDictionnaire } from '../modeles/ligneDictionnaireModel';
import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { ViewController } from 'ionic-angular/navigation/view-controller';

@Component({
  selector: 'page-ligne-dictionnaire',
  templateUrl: 'ligneDictionnaire.html',
})
export class LigneDictionnairePage implements OnInit {
  name: string;

  ligne: ILigneDictionnaire;
  index:number;

  constructor(private dictionnaireService: DictionnaireService, 
    private viewController:ViewController, private navParams: NavParams) {

  }

  ngOnInit() {
    
    this.index = this.navParams.get('ligneParam');
    this.ligne = this.dictionnaireService.dictionnaireList[this.index]; 

  }
  onSubmitWord(form: NgForm) {

    console.log(form.value);
    this.viewController.dismiss();

  }

}
