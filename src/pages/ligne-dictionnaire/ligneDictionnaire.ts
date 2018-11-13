import { LigneDictionnaireModificationPage } from './modification/ligneDictionnaireModification';
import { AlertController } from "ionic-angular/components/alert/alert-controller";
import { IUtilisateur } from "./../modeles/utilisateurModel";
import { ILigneDictionnaire } from "../modeles/ligneDictionnaireModel";
import { Component, OnInit } from "@angular/core";
import { NavParams } from "ionic-angular";
import { NavController } from "ionic-angular/navigation/nav-controller";
import { LoginPage } from "../login/login";

@Component({
  selector: "page-ligne-dictionnaire",
  templateUrl: "ligneDictionnaire.html"
})
export class LigneDictionnairePage implements OnInit {
  name: string;

  ligne: ILigneDictionnaire;
  index: number;
  public loginPage = LoginPage;
  resultatsLigne: any;
  user: IUtilisateur;
  access: boolean = false;
  contributeurAccess: boolean = false;
  valideurs: Array<number> = [1, 2];
  dialect:string;

  constructor(
    private alertCtrl: AlertController,
    private navParams: NavParams,
    private navCtrl: NavController,
  ) {
    this.user = this.navParams.get("user");
  }

  ngOnInit() {
    this.ligne = this.navParams.get("ligneParam");
    this.accesContributeur();
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
      inputs: [
        {
          type: "radio",
          label: "Shi Ngazidja",
          value:"ngz",
          checked:true
        },
        {
          type:"radio",
          label: "Shi Ndzuani",
          value:"ndz"
        },
        {
          type:"radio",
          label: "Shi Mwali",
          value:"mwa"
        },
        {
          type:"radio",
          label: "Shi Maore",
          value:"mao"
        },
        {
          type:"radio",
          label: "Suggestion ou Remarque",
          value:"sug"
        }
      ],
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
