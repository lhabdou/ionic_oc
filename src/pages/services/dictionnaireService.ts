import { IUtilisateur } from '../modeles/utilisateurModel';
import { ILigneDictionnaire } from '../modeles/ligneDictionnaireModel';


export class DictionnaireService {

    public utilisateur: IUtilisateur = {
        id_utilisateur: 1,
        nom: "Soilihi",
        prenom: "Abdoulhalim",
        mdp: "123456",
        pseudo: "lhabdou",
        email: "lhabdou26@hotmail.fr",
        url_image: ""
    };

    public dictionnaireList: ILigneDictionnaire[] = [

        {
            mot_fr: "Manger", mot_ngz: "Hula", mot_ndz: "Hula", mot_mwa: "Wuya", mot_mao: "...", mot_ang: "To Eat",
            statut: { id_statut: 1, statut: 'Nouveau' }, utilisateur: this.utilisateur, suggestion: "",
            definition_fr: "",
            definition_com: ""
        },
        {
            mot_fr: "Parler", mot_ngz: "Wu Rongowa", mot_ndz: "Wu Laguwa", mot_mwa: "Wu Rongowa", mot_mao: "Rongowa", mot_ang: "To Speak",
            statut: { id_statut: 1, statut: 'Nouveau' }, utilisateur: this.utilisateur, suggestion: "",
            definition_fr: "",
            definition_com: ""
        },
        {
            mot_fr: "Marcher", mot_ngz: "Hwenda", mot_ndz: "...", mot_mwa: "...", mot_mao: "...", mot_ang: "To eat",
            statut: { id_statut: 1, statut: 'Nouveau' }, utilisateur: this.utilisateur, suggestion: "",
            definition_fr: "",
            definition_com: ""
        }
    ];






}