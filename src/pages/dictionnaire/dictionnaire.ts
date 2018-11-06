import { IUtilisateur } from './../modeles/utilisateurModel';
import { NavParams } from 'ionic-angular';
import { IRole } from './../modeles/roleModel';
import { DictionnaireService } from './../services/dictionnaireService';
import { LigneDictionnairePage } from './../ligne-dictionnaire/ligneDictionnaire';
import { Component } from '@angular/core';
import { UtilisateurService } from '../services/utilisateurService';
import { NavController, MenuController } from 'ionic-angular';
import { ILigneDictionnaire } from '../modeles/ligneDictionnaireModel';
@Component({
    selector: 'page-dictionnaire',
    templateUrl: 'dictionnaire.html'
})
export class DictionnairePage {

    dictionnaireList: any;
    motCle: string;
    langue:string ='fr';
    role: IRole;
    user: IUtilisateur;

    constructor(private navCtrl: NavController, private dictionnaireService: DictionnaireService,
        public utilisateurService: UtilisateurService, private menuCtrl: MenuController, private navParams: NavParams) {

          this.user = this.navParams.data;

    }

    onLoadLigneDictionnaire(index: number) {

        this.navCtrl.push(LigneDictionnairePage, {ligneParam: this.dictionnaireList[index] , user:this.user});

        //let modal = this.modalCtrl.create(LigneDictionnairePage, {ligneParam:index});
        //modal.present();
    }

    onToggleMenu() {
        this.menuCtrl.open();
    }


    onInput(ev: any) {

        if (this.motCle && this.motCle.length >= 2) {

            this.dictionnaireService.lancerUneRecherche(this.motCle, this.langue).subscribe(
                (result: ILigneDictionnaire[]) => {
                    this.dictionnaireList = result;
                });
        } else {
            this.dictionnaireList = false;
        }
    }

}
