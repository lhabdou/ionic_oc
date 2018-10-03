import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { AngularFireAuth } from 'angularfire2/auth';
import { IUtilisateur } from './../modeles/utilisateurModel';
import { IRole } from './../modeles/roleModel';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UtilisateurService } from '../services/utilisateurService';
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage implements OnInit {

  user = {} as IUtilisateur;
  confPassword: string;
  signupForm: FormGroup;
  signupError: string;

  roleContributeur = { id: 3, role: "CONTRIBUTEUR" } as IRole;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams,
    private userSrv: UtilisateurService, private fb: FormBuilder) {

    this.signupForm = this.fb.group({

      nom: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      prenom: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      pseudo: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.compose([Validators.required,])]
    
      });

      //{validator: this.checkPassword('password', 'confirmPassword')}

  }

  checkPassword(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): { [key: string]: any } | null => {
      let password = group.get(passwordKey);
      let confirmPassword = group.get(confirmPasswordKey);
      if (password.value == confirmPassword.value)
        return null;
      return {
        mismatchedPasswords: true
      };
    }
  }



  ngOnInit(): void {
    if (this.afAuth.auth.currentUser) {

      this.user.role = this.roleContributeur;

    }


  }


  async saveNewUser(user: IUtilisateur) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.mdp);
      user.role = this.roleContributeur;
      console.log("uid: " + user.uid);
      console.log("token : " + result.user.getIdTokenResult + "2 id token: " + result.user.getIdToken)
      user.uid = result.user.getIdToken;
      this.userSrv.saveProfileUser(user);
    }
    catch (e) {
      this.signupError = e.message;
      console.error(e);
    }


  }

}
