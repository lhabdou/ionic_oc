import { TabsPage } from "./../tabs/tabs";
import { NavController } from "ionic-angular/navigation/nav-controller";
import { ToastController } from "ionic-angular/components/toast/toast-controller";
import { AngularFireAuth } from "angularfire2/auth";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component } from "@angular/core";
@Component({
  selector: "page-mdp-oublie",
  templateUrl: "mdp-oublie.html"
})
export class MdpOubliePage {
  error: string;
  email: string;
  mdpOublieForm: FormGroup;

  constructor(
    public afAuth: AngularFireAuth,
    public fb: FormBuilder,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {
    this.mdpOublieForm = this.fb.group({
      email: ["", Validators.compose([Validators.required, Validators.email])]
    });
  }

  reinitialiserMdp() {
    this.afAuth.auth.sendPasswordResetEmail(this.email).then(
      result => {
        this.mdpReinitialise();
      },
      error => {
        this.error = error.message;
      }
    );
  }

  mdpReinitialise() {
    let toast = this.toastCtrl.create({
      message:
        "Le message contenant le lien de réinitialisation de votre mot de passe est envoyé à votre adresse email suivant: " +
        this.email,
      duration: 3000,
      position: "bottom"
    });
    toast.present();
    this.navCtrl.setRoot(TabsPage);
  }
}
