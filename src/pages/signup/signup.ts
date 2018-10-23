import { HttpHeaders } from '@angular/common/http';
import { ENVIRONNEMENT } from './../../constantes/constantesUtilis';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AngularFireAuth } from "angularfire2/auth";
import { IUtilisateur } from "./../modeles/utilisateurModel";
import { IRole } from "./../modeles/roleModel";
import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { UtilisateurService } from "../services/utilisateurService";
@Component({
  selector: "page-signup",
  templateUrl: "signup.html"
})
export class SignupPage {
  user = {} as IUtilisateur;
  confPassword: string;
  signupForm: FormGroup;
  signupError: string;
  newUser: boolean;

  roleContributeur = { id: 3, role: "CONTRIBUTEUR" } as IRole;

  constructor(
    private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    private userSrv: UtilisateurService,
    private fb: FormBuilder,
    private httpClient:HttpClient
  ) {
    this.newUser = navParams.get("newUser");
    if (!this.newUser) {
      this.user = navParams.get("user");

      this.signupForm = this.fb.group(
        {
          nom: [
            "",
            Validators.compose([Validators.required, Validators.minLength(2)])
          ],
          prenom: [
            "",
            Validators.compose([Validators.required, Validators.minLength(2)])
          ],
          pseudo: [
            "",
            Validators.compose([Validators.required, Validators.minLength(2)])
          ],
          email: [
            "",
            Validators.compose([Validators.required, Validators.email])
          ],
          password: [
            "",
            Validators.compose([Validators.required, Validators.minLength(6)])
          ]}
      );

    } else {

      this.signupForm = this.fb.group(
        {
          nom: [
            "",
            Validators.compose([Validators.required, Validators.minLength(2)])
          ],
          prenom: [
            "",
            Validators.compose([Validators.required, Validators.minLength(2)])
          ],
          pseudo: [
            "",
            Validators.compose([Validators.required, Validators.minLength(2)])
          ],
          email: [
            "",
            Validators.compose([Validators.required, Validators.email])
          ],
          password: [
            "",
            Validators.compose([Validators.required, Validators.minLength(6)])
          ],

          confPassword: ["", Validators.compose([Validators.required, Validators.minLength(6)])]
        },
        { validator: this.checkPassword("password", "confPassword") }
      );

    }


  }

  checkPassword(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): { [key: string]: any } | null => {
      let password = group.get(passwordKey);
      let confirmPassword = group.get(confirmPasswordKey);
      if (password.value == confirmPassword.value) return null;
      return {
        mismatchedPasswords: true
      };
    };
  }

  async saveUser(user: IUtilisateur, newUtilisateur?: boolean) {
    if (newUtilisateur) {
      user.role = this.roleContributeur;
      this.afAuth.auth
        .createUserWithEmailAndPassword(user.email, user.mdp)
        .then((data: firebase.auth.UserCredential) => {
          data.user
            .getIdToken()
            .then((token: string) => {
              user.token = token;
              this.userSrv.saveProfileUser(user);
            })
            .catch(error => {

              this.signupError ="Erreur lors de la vérification Backend du token /br", error.message;
              console.log(
                "Erreur lors de la vérification Backend du token",
                error
              );
            });
        })
        .catch(error => {
          this.signupError ="Erreur lors de l'enregistrement du nouveau utilisateur dans firebase/br",  error.message;
          console.log(
            "Erreur lors de l'enregistrement du nouveau utilisateur dans firebase",
            error
          );
        });
    } else {

      var userUpdate = this.afAuth.auth.currentUser;
      userUpdate.updateEmail(user.email).then((data)=>{

      }).catch((error)=>{
        this.signupError = "Erreur lors de la mise à jour de l'adresse mail /br ", error.message;
        console.log("Erreur lors de la mise à jour de l'adresse mail", error);

      });

      const headersOption = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Accept-Type": "application/json",
          "token": user.token
        })
      };

      this.httpClient.put(ENVIRONNEMENT.URL_REST_LOCAL + "", user, headersOption);

    }
  }
}
