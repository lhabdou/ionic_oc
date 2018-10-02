import { DictionnaireService } from './../services/dictionnaireService';
import { LigneDictionnairePage } from './../ligne-dictionnaire/ligneDictionnaire';
import { ILigneDictionnaire } from '../modeles/ligneDictionnaireModel';
import { Component } from '@angular/core';
import { UtilisateurService } from '../services/utilisateurService';
import { NavController, MenuController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { OnInit, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
@Component({
    selector: 'page-dictionnaire',
    templateUrl: 'dictionnaire.html'
})
export class DictionnairePage implements OnInit, OnDestroy {

    dictionnaireList: ILigneDictionnaire[];
    dictionnaireSubscription: Subscription;

    motCle: string;


    constructor(private navCtrl: NavController, private dictionnaireService: DictionnaireService,
        public utilisateurService: UtilisateurService, private menuCtrl: MenuController) {

    }
    ngOnInit() {

        this.dictionnaireSubscription = this.dictionnaireService.ligneDictionnaires$.subscribe(
            (ligneDictionnaires: ILigneDictionnaire[]) => {
                this.dictionnaireList = ligneDictionnaires;
            }
        );
        this.dictionnaireService.emitLigneDictionnaires();
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

    ngOnDestroy() {

    }

}