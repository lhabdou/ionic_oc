import { ENVIRONNEMENT } from "./../../constantes/constantesUtilis";
import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { ILigneDictionnaire } from "../modeles/ligneDictionnaireModel";
import { Observable } from "rxjs";
@Injectable()
export class DictionnaireService {
  constructor(private httpClient: HttpClient) {}
  dictionnaireFilter: ILigneDictionnaire[];


  lancerUneRecherche(motCle: string, langue:string): Observable<ILigneDictionnaire[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": 'application/json',
        "Accept":'application/json',
        "langue":langue
      })
    };

   return  this.httpClient.get<ILigneDictionnaire[]>(
      ENVIRONNEMENT.URL_REST_LOCAL + "/rechercher/" + motCle,
      httpOptions);

  }

}
