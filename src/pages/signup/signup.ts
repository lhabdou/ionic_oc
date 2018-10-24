import { TabsPage } from './../tabs/tabs';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AngularFireAuth } from "angularfire2/auth";
import { IUtilisateur } from "./../modeles/utilisateurModel";
import { IRole } from "./../modeles/roleModel";
import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { UtilisateurService } from "../services/utilisateurService";
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
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
    public toastCtrl:ToastController,
    private userSrv: UtilisateurService,
    private fb: FormBuilder
  ) {
    this.newUser = navParams.get("newUser");
    if (!this.newUser) {
      this.user = navParams.get("user");

      this.signupForm = this.fb.group({
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
        ]
      });
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
          confPassword: [
            "",
            Validators.compose([Validators.required, Validators.minLength(6)])
          ]
        },
        { validator: this.checkPassword("password", "confPassword") }
      );
    }
  }
  ngOnInit(): void {

    this.user.mdp = "";

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
              this.userSrv.saveProfileUser(user, newUtilisateur);
            })
            .catch(error => {
              (this.signupError =
                error.message);
            });
        })
        .catch(error => {
          (this.signupError = error.message);
        });
    } else {
      var userUpdate = this.afAuth.auth.currentUser;
      userUpdate
        .updateEmail(user.email)
        .then(data => {
          this.userSrv.saveProfileUser(user, newUtilisateur);
          this.profilMaj();

        })
        .catch(error => {
          (this.signupError = error.message);
        });


    }
  }

  profilMaj() {

    let toast = this.toastCtrl.create({
      message:"Votre profil est bien mis à jour",
      duration: 2000,
      position: "bottom"
    });
    toast.present();
    this.navCtrl.setRoot(TabsPage);
  }
}
