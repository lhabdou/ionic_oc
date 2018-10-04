import { IRole } from './roleModel';
export interface IUtilisateur {

    idUtilisateur?: string;
    nom: string;
    prenom: string;
    mdp?: string;
    pseudo?: string;
    email: string;
    urlImage?: string;
    role?: IRole;
    token?: string;

};
