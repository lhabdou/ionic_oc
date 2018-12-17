import { IPays } from "./../modeles/paysModel";
import { ENVIRONNEMENT } from "./../../constantes/constantesUtilis";
import { TabsPage } from "./../tabs/tabs";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AngularFireAuth } from "angularfire2/auth";
import { IUtilisateur } from "./../modeles/utilisateurModel";
import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { UtilisateurService } from "../services/utilisateurService";
import { ToastController } from "ionic-angular/components/toast/toast-controller";
import * as firebase from "firebase";
import { AlertController } from "ionic-angular/components/alert/alert-controller";
import { PaysService } from "../services/paysService";
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
  oldEmail: string;
  coutryExist: boolean;
  listePays: IPays[];

  constructor(
    private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private userSrv: UtilisateurService,
    private alertCtrl: AlertController,
    private fb: FormBuilder,
    private paysService: PaysService
  ) {
    this.newUser = navParams.get("newUser");
    if (!this.listePays) {
      this.paysService.getAllCountries().subscribe((paysData: IPays[]) => {
        this.listePays = paysData;
      });
    }

    if (!this.newUser) {
      this.user = navParams.get("user");
      this.oldEmail = this.user.email;

      this.signupForm = this.fb.group({
        nom: [
          "",
          Validators.compose([Validators.required, Validators.minLength(2)])
        ],
        prenom: [
          "",
          Validators.compose([Validators.required, Validators.minLength(2)])
        ],
        pseudo: ["", Validators.minLength(2)],
        pays: [Validators.required],
        tel: [],
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
          pseudo: ["", Validators.minLength(2)],
          pays: [Validators.required],
          tel: [],
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
      user.role = ENVIRONNEMENT.roleContributeur;
      this.afAuth.auth
        .createUserWithEmailAndPassword(user.email, user.mdp)
        .then((data: firebase.auth.UserCredential) => {
          data.user
            .getIdToken()
            .then((token: string) => {
              user.token = token;
              user.idUtilisateur = data.user.uid;
              this.userSrv.saveProfileUser(user, newUtilisateur);
              this.profilCree();
            })
            .catch(error => {
              this.signupError = error.message;
            });
          data.user.sendEmailVerification().then(
            ok => {},
            error => {
              this.signupError =
                "Erreur lors de l'envoie du mail de vérification";
            }
          );
        })
        .catch(error => {
          this.signupError = error.message;
        });
    } else {
      this.afAuth.auth
        .signInWithEmailAndPassword(this.oldEmail, this.user.mdp)
        .then(userOk => {
          var userUpdate = this.afAuth.auth.currentUser;
          userUpdate
            .updateEmail(user.email)
            .then(data => {
              this.userSrv.saveProfileUser(user, newUtilisateur);
              this.profilMaj();
            })
            .catch(error => {
              this.signupError = error.message;
            });
        })
        .catch(errorMdp => {
          this.signupError = errorMdp.message;
        });
    }
  }

  profilMaj() {
    let toast = this.toastCtrl.create({
      message: "Votre profil est bien mis à jour",
      duration: 2000,
      position: "bottom"
    });
    toast.present();
    this.navCtrl.setRoot(TabsPage);
  }

  supprimerProfil() {
    this.presentConfirm();
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: "Attention",
      message:
        "Vous êtes sur le point de supprimer votre profil, Vous allez perdre tous les points de contributions acquis si vous continuer.",
      buttons: [
        {
          text: "Annuler",
          role: "cancel",
          handler: () => {
            //Nothing To Do
          }
        },
        {
          text: "Supprimer",
          handler: () => {
            this.userSrv.supprimerUtilisateur(this.user);
            this.navCtrl.setRoot(TabsPage);
          }
        }
      ]
    });
    alert.present();
  }

  profilCree() {
    let alert = this.alertCtrl.create({
      title: "Confirmation de votre Email",
      message:
        "Veuillez confirmer votre adresse mail en cliquant sur le lien qui vous a été envoyé.",
      buttons: [
        {
          text: "Ok",
          handler: () => {
            this.navCtrl.setRoot(TabsPage);
          }
        }
      ]
    });
    alert.present();
  }

  comparePays(e1: IPays, e2: IPays): boolean {
    return e1 && e2 ? e1.code === e2.code : e1 === e2;
  }
}
