import { Injectable } from "@angular/core";
import { IPays } from "./../modeles/paysModel";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ENVIRONNEMENT } from "../../constantes/constantesUtilis";
@Injectable()
export class PaysService {
  pays: IPays[];

  constructor(private httpClient: HttpClient) {}

  getAllCountries() {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Accept-Type": "application/json"
      })
    };

    return this.httpClient.get<IPays[]>(
      ENVIRONNEMENT.URL_REST_LOCAL + "/pays",
      httpOptions
    );
  }
}
