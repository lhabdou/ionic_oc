import { AngularFireAuth } from 'angularfire2/auth';
import { IUtilisateur } from './../modeles/utilisateurModel';
import { IRole } from './../modeles/roleModel';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  user = {} as IUtilisateur;

  role = { id: 4, role: "Invite" } as IRole;


  constructor(private afAuth:AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {

  }

  ngOnInit(): void {

    this.user.role = this.role;

  }

  async saveNewUser(user:IUtilisateur) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.mdp);
      console.log(result);
    }
    catch (e) {

      console.error(e);
    }
    

  }

}
