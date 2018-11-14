import { ENVIRONNEMENT } from './../../constantes/constantesUtilis';
import { AccessService } from './../services/accessService';
import { LigneDictionnaireModificationPage } from './modification/ligneDictionnaireModification';
import { AlertController } from "ionic-angular/components/alert/alert-controller";
import { IUtilisateur } from "./../modeles/utilisateurModel";
import { ILigneDictionnaire } from "../modeles/ligneDictionnaireModel";
import { Component, OnInit } from "@angular/core";
import { NavParams } from "ionic-angular";
import { NavController } from "ionic-angular/navigation/nav-controller";
@Component({
  selector: "page-ligne-dictionnaire",
  templateUrl: "ligneDictionnaire.html"
})
export class LigneDictionnairePage implements OnInit {

  ligne: ILigneDictionnaire;
  user: IUtilisateur;
  dialect:string;

  constructor(
    private alertCtrl: AlertController,
    private navParams: NavParams,
    private navCtrl: NavController,
    private accessService:AccessService
  ) {
    this.user = this.navParams.get("user");
  }

  ngOnInit() {
    this.ligne = this.navParams.get("ligneParam");
    this.accessService.accesContributeur(this.user, this.ligne);
  }


  proposer() {
    this.choixDialect();
  }

  confirmationOk(titre: string, msg: string) {
    let alert = this.alertCtrl.create({
      title: titre,
      message: msg,
      buttons: [
        {
          text: "Ok",
          handler: () => {}
        }
      ]
    });
    alert.present();
  }

  choixDialect() {
    let alert = this.alertCtrl.create({
      title: "Dialecte à modifier",
      message:
        "Veuillez choisir la langue que vous souhaitez faire une modification, ou choisir ",
      inputs:ENVIRONNEMENT.inputsDialect,
      buttons: [
        {
          text: "Annuler",
          handler: () => { }
        },
        {
          text: "Ok",
          handler: (value) => {
            this.dialect= value;
            this.navCtrl.push(LigneDictionnaireModificationPage, {
              ligne: this.ligne,
              user: this.user,
              dialect: this.dialect
            });
          }
        }
      ]
    });
    alert.present();
  }
}
