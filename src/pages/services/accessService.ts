import { ILigneDictionnaire } from "./../modeles/ligneDictionnaireModel";
import { IUtilisateur } from "./../modeles/utilisateurModel";
import { IRole } from "./../modeles/roleModel";
import { Injectable } from "@angular/core";
import { ENVIRONNEMENT } from "../../constantes/constantesUtilis";
@Injectable()
export class AccessService {
  access: boolean = false;
  contributeurAccess: boolean = false;

  public checkRoles(roles: Array<IRole>, role: IRole): boolean {
    roles.forEach(element => {
      if (element.id == role.id && element.role == role.role) {
        this.access = true;
      }
    });

    return this.access;
  }

  public accesValidation(user: IUtilisateur): boolean {
    if (
      user &&
      user.role &&
      this.checkRoles(ENVIRONNEMENT.valideurs, user.role)
    ) {
      this.access = true;
    }
    return this.access;
  }

  public accesContributeur(
    user: IUtilisateur,
    ligne: ILigneDictionnaire
  ): boolean {
    let contributeurs = 3;
    if (
      user &&
      user.emailVerifie &&
      user.role &&
      (this.checkRoles(ENVIRONNEMENT.valideurs, user.role) ||
        (this.checkStatut(ligne) && contributeurs == user.role.id))
    ) {
      this.contributeurAccess = true;
    }
    return this.contributeurAccess;
  }

  public checkStatut(ligne: ILigneDictionnaire): boolean {
    return (
      ligne.statut.statut != "A VALIDER" && ligne.statut.statut != "CLOTURE"
    );
  }

  public checkAdmin(role: IRole) {
    let admin = false;

    if (
      role.role == ENVIRONNEMENT.roleAdmin.role &&
      role.id == ENVIRONNEMENT.roleAdmin.id
    ) {
      admin = true;
    }
    return admin;
  }
}
