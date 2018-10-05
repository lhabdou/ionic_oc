import { Observable } from "rxjs/Observable";
import { ENVIRONNEMENT } from "./../../constantes/constantesUtilis";
import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { ILigneDictionnaire } from "../modeles/ligneDictionnaireModel";
@Injectable()
export class DictionnaireService {
  constructor(private httpClient: HttpClient) {}
  dictionnaireFilter: ILigneDictionnaire[];

  public lancerUneRecherche(motCle: string): Observable<ILigneDictionnaire[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };

    return this.httpClient.get<ILigneDictionnaire[]>(
      ENVIRONNEMENT.URL_REST_LOCAL + "/rechercher/" + motCle,
      httpOptions
    );
  }

}
