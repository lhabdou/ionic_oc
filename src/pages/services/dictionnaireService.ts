import { IUtilisateur } from './../modeles/utilisateurModel';
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

  proposer(ligne: ILigneDictionnaire, user:IUtilisateur): Observable<ILigneDictionnaire[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": 'application/json',
        "Accept":'application/json',
        "token": user.token,
      })
    };

   return  this.httpClient.put<ILigneDictionnaire[]>(
      ENVIRONNEMENT.URL_REST_LOCAL + "/proposermodification", ligne,
      httpOptions);

  }

  validerMot(ligne: ILigneDictionnaire, user:IUtilisateur): Observable<ILigneDictionnaire[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": 'application/json',
        "Accept":'application/json',
        "token": user.token,

      })
    };

   return  this.httpClient.put<ILigneDictionnaire[]>(
      ENVIRONNEMENT.URL_REST_LOCAL + "/valider", ligne,
      httpOptions);

  }

  listerMotsAValider(dialect:string, token:string) {

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": 'application/json',
        "Accept":'application/json',
        "token": token,
        "dialect":dialect

      })
    };

   return  this.httpClient.get<ILigneDictionnaire[]>(
      ENVIRONNEMENT.URL_REST_LOCAL + "/listerpropositions",
      httpOptions);

  }

}
