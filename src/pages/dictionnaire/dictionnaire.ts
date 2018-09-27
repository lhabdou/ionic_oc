import { LoginPage } from './../login/login';
import { NavController } from 'ionic-angular';
import { DictionnaireService } from './../services/dictionnaireService';
import { LigneDictionnairePage } from './../ligne-dictionnaire/ligneDictionnaire';
import { ILigneDictionnaire } from '../modeles/ligneDictionnaireModel';
import { Component } from '@angular/core';
import { UtilisateurService } from '../services/utilisateurService';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
@Component({
    selector: 'page-dictionnaire',
    templateUrl: 'dictionnaire.html'
})
export class DictionnairePage {

    dictionnaireList: ILigneDictionnaire[];
    public motCle: string;
    public notConnected: boolean = true;
    loginPage = LoginPage;

    constructor(private navCtrl: NavController, private dictionnaireService: DictionnaireService,
        public utilisateurService: UtilisateurService,
        public menuCtrl: MenuController) {

    }


    ngOnInit(): void {

        this.dictionnaireList = this.dictionnaireService.dictionnaireList.slice();

        this.notConnected = !this.utilisateurService.loginState;
    }

    onLoadLigneDictionnaire(index: number) {

        this.navCtrl.push(LigneDictionnairePage, { ligneParam: index });

        //let modal = this.modalCtrl.create(LigneDictionnairePage, {ligneParam:index});
        //modal.present();
    }


    onInput(ev: any) {

        if (this.motCle && this.motCle.length >= 2) {

            this.dictionnaireList = this.dictionnaireService.filtrerListe(this.motCle);
        }
    }

    onToggleMenu() {

        this.menuCtrl.open();
  
    }


}