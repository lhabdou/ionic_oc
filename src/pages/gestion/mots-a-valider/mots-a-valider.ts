import { LigneDictionnaireModificationPage } from './../../ligne-dictionnaire/modification/ligneDictionnaireModification';
import { IUtilisateur } from "./../../modeles/utilisateurModel";
import { ILigneDictionnaire } from "./../../modeles/ligneDictionnaireModel";
import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

@Component({
  selector: "page-mots-a-valider",
  templateUrl: "mots-a-valider.html"
})
export class MotsAValiderPage {

  user: IUtilisateur;
  mots: ILigneDictionnaire[];
  dialect: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.navParams.data.user;
    this.mots = this.navParams.data.mots;
    this.dialect = this.navParams.data.dialect;
  }

  onLoadLigneDictionnaire(index:number) {

      this.navCtrl.push(LigneDictionnaireModificationPage, {ligne: this.mots[index] , user:this.user, dialect:this.dialect});

  }
}
