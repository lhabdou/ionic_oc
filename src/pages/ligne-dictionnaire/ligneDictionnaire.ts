import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { ILigneDictionnaire } from '../modeles/ligneDictionnaireModele';
import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'page-ligne-dictionnaire',
  templateUrl: 'ligneDictionnaire.html',
})
export class LigneDictionnairePage implements OnInit {
  name: string;

  ligne: ILigneDictionnaire;

  constructor(private screenOrientation: ScreenOrientation, private navParams: NavParams) {

  }



  ngOnInit() {

    // set to landscape
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);

    this.ligne = this.navParams.get('ligneParam');

  }

}
