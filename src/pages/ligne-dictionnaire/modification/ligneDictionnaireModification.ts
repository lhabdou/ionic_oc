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
  access: boolean = false;
  contributeurAccess: boolean = false;
  valideurs: Array<number> = [1, 2];
  dialect: string;

  constructor(
    private alertCtrl: AlertController,
    private navParams: NavParams,
    private dictionnaireService: DictionnaireService,
    private navCtrl: NavController
  ) {
    this.user = this.navParams.get("user");
  }

  ngOnInit() {
    this.ligne = this.navParams.get("ligne");
    this.dialect = this.navParams.get("dialect");
    this.ligne.dialectModifie = this.dialect;
    this.accesContributeur();
  }

  accesValidation(): boolean {
    if (
      this.user &&
      this.user.role &&
      this.checkArray(this.valideurs, this.user.role.id)
    ) {
      this.access = true;
    }
    return this.access;
  }

  accesContributeur(): boolean {
    let contributeurs = 3;
    if (
      this.user && this.user.emailVerifie &&
      this.user.role &&
      (this.checkArray(this.valideurs, this.user.role.id) ||
        (this.checkStatut() && contributeurs == this.user.role.id))
    ) {
      this.contributeurAccess = true;
    }
    return this.contributeurAccess;
  }

  private checkStatut(): boolean {
    return (
      this.ligne.statut.statut != "A VALIDER" &&
      this.ligne.statut.statut != "CLOTURE"
    );
  }

  checkArray(tableau: Array<number>, id: number): boolean {
    tableau.forEach(element => {
      if (element == id) {
        this.access = true;
      }
    });

    return this.access;
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
