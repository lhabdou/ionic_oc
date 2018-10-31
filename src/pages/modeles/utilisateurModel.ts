import { IPays } from './paysModel';
import { IRole } from './roleModel';
export class IUtilisateur {

    idUtilisateur?: string;
    nom: string;
    prenom: string;
    mdp?: string;
    pseudo?: string;
    tel?: string;
    pays?:IPays;
    email: string;
    googleConnect: boolean;
    urlImage?: string;
    role?: IRole;
    token?: string;

};
