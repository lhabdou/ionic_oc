import { ILigneDictionnaire } from '../modeles/ligneDictionnaireModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ENVIRONNEMENT } from '../../constantes/constantesUtilis';
import { Injectable } from '@angular/core';


@Injectable()
export class DictionnaireService {

  dictionnaireFilter: ILigneDictionnaire[];

  constructor(public httpClient: HttpClient) { }

  public lancerUneRecherche(motCle: string): ILigneDictionnaire[] {

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Accept":'application/json'
      })
    };

    this.httpClient.get(
      ENVIRONNEMENT.URL_REST_LOCAL + "/rechercher/" + motCle,
      httpOptions
    )
      .subscribe(
        (result: ILigneDictionnaire[]) => {
          this.dictionnaireFilter = result;
        },
        error => {
          console.log(
            "Erreur lors de la recherche",
            error
          );
        }
      );

    return this.dictionnaireFilter;
  }

}