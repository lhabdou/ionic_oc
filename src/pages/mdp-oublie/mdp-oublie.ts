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

  constructor(public afAuth: AngularFireAuth, public fb: FormBuilder) {
    this.mdpOublieForm = this.fb.group({
      email: ["", Validators.compose([Validators.required, Validators.email])]
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad MdpOubliePage");
  }

  reinitialiserMdp() {
    this.afAuth.auth
      .sendPasswordResetEmail(this.email)
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log("erreur", error);
      });
  }
}
