import { DictionnaireService } from './../services/dictionnaireService';
import { LigneDictionnairePage } from './../ligne-dictionnaire/ligneDictionnaire';
import { ILigneDictionnaire } from '../modeles/ligneDictionnaireModel';
import { Component } from '@angular/core';
import { UtilisateurService } from '../services/utilisateurService';
import { NavController, MenuController } from 'ionic-angular';
@Component({
    selector: 'page-dictionnaire',
    templateUrl: 'dictionnaire.html'
})
export class DictionnairePage {

    dictionnaireList: ILigneDictionnaire[];
    motCle: string;

    constructor(private navCtrl: NavController, private dictionnaireService: DictionnaireService,
        public utilisateurService: UtilisateurService, private menuCtrl: MenuController) {

        }


    onInput(ev: any) {
    
        if (this.motCle && this.motCle.length >= 2) {

            this.dictionnaireList = this.dictionnaireService.lancerUneRecherche(this.motCle);
        }
    }

    
    onLoadLigneDictionnaire(index: number) {

        this.navCtrl.push(LigneDictionnairePage, { ligneParam: index });

        //let modal = this.modalCtrl.create(LigneDictionnairePage, {ligneParam:index});
        //modal.present();
    }

    onToggleMenu() {
        this.menuCtrl.open();
   }

}