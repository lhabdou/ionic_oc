import { NavController } from 'ionic-angular/navigation/nav-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { DictionnaireService } from './../services/dictionnaireService';
import { IUtilisateur } from "./../modeles/utilisateurModel";
import { ILigneDictionnaire } from "../modeles/ligneDictionnaireModel";
import { Component, OnInit } from "@angular/core";
import { NavParams } from "ionic-angular";
import { NgForm } from "@angular/forms/src/directives/ng_form";
import { ViewController } from "ionic-angular/navigation/view-controller";
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


  constructor(
    private viewController: ViewController, private alertCtrl:AlertController,
    private navParams: NavParams, private dictionnaireService:DictionnaireService,
    private navCtrl: NavController
  ) {
    this.user = this.navParams.get("user");
    this.accesContributeur();

  }

  ngOnInit() {
    this.ligne = this.navParams.get("ligneParam");


  }
  onSubmitWord(form: NgForm) {
    this.viewController.dismiss();
  }

  accesValidation(): boolean {
    let valideurs:Array<number> = [1, 2];
    if (
      this.user &&
      this.user.role &&
      (this.checkArray(valideurs, this.user.role.id))
    ) {
      this.access = true;
    }
    return this.access;
  }

  accesContributeur(): boolean {
    let contributeurs:Array<number> = [1, 2, 3];

    if (
      this.user &&
      this.user.role &&
      (this.checkArray(contributeurs, this.user.role.id))
    ) {
      this.contributeurAccess = true;
    }
    return this.contributeurAccess;
  }

  checkArray(array : Array<number>, id:number): boolean {

    array.forEach(element => {
      if(element == id) {
        this.access = true;
      }
    });

    return this.access;
  }


  proposer() {
    this.dictionnaireService.proposer(this.ligne, this.user).subscribe(
      (result)=>{

        this.confirmationOk("Confirmation","Merci pour votre" +
        " contribution, un mail vous sera envoyé "+
        "une fois votre proposition analysée");

      });
  }

  validerMot() {

    this.dictionnaireService.validerMot(this.ligne, this.user).subscribe(
      (result)=>{
        this.confirmationOk("Confirmation","Le mot " + this.ligne.motFr +", est bien validé");
      });

  }


  confirmationOk( titre:string, msg:string) {
    let alert = this.alertCtrl.create({
      title: titre,
      message: msg,
      buttons: [
        {
          text: "Ok",
          handler: () => {
          }
        }
      ]
    });
    alert.present();
  }
}
