import { IRole } from './../modeles/roleModel';
import { IUtilisateur } from '../modeles/utilisateurModel';
import { ILigneDictionnaire } from '../modeles/ligneDictionnaireModel';


export class DictionnaireService {

    public role: IRole = {
        id:1,
        role:"Administrateur"
    }

    public utilisateur: IUtilisateur = {
        idUtilisateur: "1",
        nom: "Soilihi",
        prenom: "Abdoulhalim",
        mdp: "123456",
        pseudo: "lhabdou",
        email: "lhabdou26@hotmail.fr",
        urlImage: "", 
        role:this.role
    };
    dictionnaireFilter:ILigneDictionnaire[] = [] as ILigneDictionnaire[]; 

    public dictionnaireList: ILigneDictionnaire[] = [

        {
            motFr: "Manger", motNgz: "Hula", motNdz: "Hula", motMwa: "Wuya", motMao: "...", motAng: "To Eat",
            statut: { idStatut: 1, statut: 'NOUVEAU' }, utilisateur: this.utilisateur, suggestion: "",
            definitionFr: "",
            definitionCom: ""
        },
        {
            motFr: "Parler", motNgz: "Wu Rongowa", motNdz: "Wu Laguwa", motMwa: "Wu Rongowa", motMao: "Rongowa", motAng: "To Speak",
            statut: { idStatut: 1, statut: 'A VALIDER' }, utilisateur: this.utilisateur, suggestion: "",
            definitionFr: "",
            definitionCom: ""
        },
        {
            motFr: "Marcher", motNgz: "Hwenda", motNdz: "...", motMwa: "...", motMao: "...", motAng: "To eat",
            statut: { idStatut: 1, statut: 'VALIDE' }, utilisateur: this.utilisateur, suggestion: "",
            definitionFr: "",
            definitionCom: ""
        }
    ];

    public filtrerListe( motCle:string): ILigneDictionnaire[] {

        this.dictionnaireFilter= [] as ILigneDictionnaire[];
        this.dictionnaireFilter.splice(0, this.dictionnaireFilter.length);
        this.dictionnaireList.forEach(ligne => {

            if (ligne.motFr.toLocaleLowerCase().includes(motCle.toLocaleLowerCase())) {
                
                this.dictionnaireFilter.push(ligne);

            }
            
        });
        
        return this.dictionnaireFilter;
    }




}