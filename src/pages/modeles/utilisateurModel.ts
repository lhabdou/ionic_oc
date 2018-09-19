import { IRole } from './roleModel';
export class IUtilisateur {

    idUtilisateur: number;
    nom: string;
    prenom: string;
    mdp: string;
    pseudo: string;
    email: string;
    urlImage: string;
    role: IRole;

};
