import { IStatut } from './statutModele';
import { IUtilisateur } from './utilisateurModele';

export interface ILigneDictionnaire {
    
    mot_fr: string,
    mot_ngz: string,
    mot_ndz: string,
    mot_mwa: string,
    mot_mao: string,
    mot_ang: string,
    utilisateur: IUtilisateur,
    statut: IStatut,
    suggestion: string,
    definition_fr: string,
    definition_com: string

};
