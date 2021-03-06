import { IStatut } from './statutModel';
import { IUtilisateur } from './utilisateurModel';

export class ILigneDictionnaire {

    motFr: string;
    motNgz: string;
    motNdz?: string;
    motMwa?: string;
    motMao?: string;
    motAng: string;
    utilisateur?: IUtilisateur;
    statut?: IStatut;
    suggestion?: string;
    definitionFr?: string;
    definitionCom?: string;
    dialectModifie?:string

};
