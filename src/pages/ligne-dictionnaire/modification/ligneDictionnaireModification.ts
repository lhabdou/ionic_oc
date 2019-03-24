import { AccessService } from './../../services/accessService';
import { AlertController } from "ionic-angular/components/alert/alert-controller";
import { DictionnaireService } from "./../../services/dictionnaireService";
import { IUtilisateur } from "./../../modeles/utilisateurModel";
import { ILigneDictionnaire } from "../../modeles/ligneDictionnaireModel";
import { Component, OnInit } from "@angular/core";
import { NavParams, NavController } from "ionic-angular";
import { LoginPage } from "../../login/login";
import { TabsPage } from '../../tabs/tabs';

@Component({
  selector: "page-ligne-dictionnaire-modification",
  templateUrl: "ligneDictionnaireModification.html"
})
export class LigneDictionnaireModificationPage implements OnInit {
  name: string;

  ligne: ILigneDictionnaire;
  index: number;
  public loginPage = LoginPage;
  resultatsLigne: any;
  user: IUtilisateur;
  accesValidation:boolean = false;
  contributeurAccess:boolean = false;
  dialect: string;

  constructor(
    private alertCtrl: AlertController,
    private navParams: NavParams,
    private dictionnaireService: DictionnaireService,
    public navCtrl: NavController,
    private accessService:AccessService
  ) {
    this.user = this.navParams.get("user");
  }

  ngOnInit() {
    this.ligne = this.navParams.get("ligne");
    this.dialect = this.navParams.get("dialect");
    this.ligne.dialectModifie = this.dialect;
    this.contributeurAccess = this.accessService.accesContributeur(this.user, this.ligne);
    this.accesValidation = this.accessService.accesValidation(this.user);
  }


  proposer() {
    this.dictionnaireService
      .proposer(this.ligne, this.user)
      .subscribe(result => {
        this.confirmationOk(
          "Confirmation",
          "Merci pour votre" +
            " contribution :) --> Marahaba Mendji"
        );
      this.navCtrl.setRoot(TabsPage);
      });

  }

  validerMot() {
    this.dictionnaireService
      .validerMot(this.ligne, this.user)
      .subscribe(result => {
        this.confirmationOk(
          "Confirmation",
          "Le mot " + this.ligne.motFr + ", est bien validé"
        );
      });
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
}
