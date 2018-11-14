import { AccessService } from './../../services/accessService';
import { TabsPage } from './../../tabs/tabs';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { AlertController } from "ionic-angular/components/alert/alert-controller";
import { DictionnaireService } from "./../../services/dictionnaireService";
import { IUtilisateur } from "./../../modeles/utilisateurModel";
import { ILigneDictionnaire } from "../../modeles/ligneDictionnaireModel";
import { Component, OnInit } from "@angular/core";
import { NavParams } from "ionic-angular";
import { LoginPage } from "../../login/login";

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

  dialect: string;

  constructor(
    private alertCtrl: AlertController,
    private navParams: NavParams,
    private dictionnaireService: DictionnaireService,
    private navCtrl: NavController,
    private accessService:AccessService
  ) {
    this.user = this.navParams.get("user");
  }

  ngOnInit() {
    this.ligne = this.navParams.get("ligne");
    this.dialect = this.navParams.get("dialect");
    this.ligne.dialectModifie = this.dialect;
    this.accessService.accesContributeur(this.user, this.ligne);
    this.accesValidation = this.accessService.accesValidation(this.user);
  }


  proposer() {
    this.dictionnaireService
      .proposer(this.ligne, this.user)
      .subscribe(result => {
        this.confirmationOk(
          "Confirmation",
          "Merci pour votre" +
            " contribution, un mail vous sera envoyé " +
            "une fois votre proposition analysée"
        );
      });

      this.navCtrl.setRoot(TabsPage);
  }

  validerMot() {
    this.dictionnaireService
      .validerMot(this.ligne, this.user)
      .subscribe(result => {
        this.confirmationOk(
          "Confirmation",
          "Le mot " + this.ligne.motFr + ", est bien validé"
        );
        this.navCtrl.getPrevious();
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
