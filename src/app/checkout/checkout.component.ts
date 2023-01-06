import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { NgForm } from '@angular/forms';
import { HttpService } from '../http.service';
import { Mail } from '../models/mail.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  session: any;
  restoredSession: any;
  items: any;
  empty!: string;
  prenom!: string;
  nom!: string;
  societe!: string;
  ville!: string;
  pays!: string;
  adresse!: string;
  adressebis!: string;
  code!: string;
  tel!: string;
  conditions: boolean = false;
  email!: string
  mail: Mail = { items: [], prenom: '', nom: '', societe: '', adresse: '', adressebis: '', ville: '', code: '', tel: '', email: '', totalprice: 0, delivery: '', objet: '', message: '' };

  constructor(
    public cartService: CartService,
    public httpService: HttpService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.session = this.cartService.getItemFromCart();
    if (this.session === null) {
      this.empty = "Votre panier est vide !";
    } else {
      this.restoredSession = JSON.parse(this.session);
      this.items = this.restoredSession.items;
      if (this.items.length === 0) {
        this.empty = "Votre panier est vide !";
      }
    };

  }

  onSubmit(form: NgForm) {
    // console.log(form.value);

    if (form.value.email == undefined || form.value.nom == undefined || form.value.adresse == undefined || form.value.code == undefined || form.value.ville == undefined) {
      alert("Attention vous prenez des risques* Tout les champs comportant une astérisque sont indispensables pour valider votre commande !");
      // window.location.reload;
    } else {
      if (this.conditions) {
        // alert("Merci " + form.value.prénom + " pour votre commande. Vous allez bientôt recevoir un mail de confirmation !");
        this.mail.nom = form.value.nom;
        this.mail.adresse = form.value.adresse;
        // this.mail.pays = form.value.pays;
        this.mail.ville = form.value.ville;
        this.mail.code = form.value.code;
        this.mail.email = form.value.email;
        this.mail.objet = "Confirmation de commande #3527861";
        this.mail.message = "Merci pour votre commande sur CharlyGo.fr. Nous vous envoyons cet email pour confirmer que votre commande avec numéro #3527861 a été enregistrée.";
        this.mail.totalprice = this.restoredSession.checkOut;
        this.mail.delivery = this.restoredSession.deliveryTotal;
        this.mail.items = this.restoredSession.items;
        if (form.value.prenom !== undefined) {
          this.mail.prenom = form.value.prenom;
        }
        if (form.value.societe !== undefined) {
          this.mail.societe = form.value.societe;
        }
        if (form.value.adressebis !== undefined) {
          this.mail.adressebis = form.value.adressebis;
        }
        if (form.value.tel !== undefined) {
          this.mail.tel = form.value.tel;
        }
        this.httpService.sendMail(this.mail).subscribe({
          error: (e) => console.error(e),
          complete: () => console.info('complete')
        });
        this.mail.email = "contact@charlygo.fr";
        this.httpService.sendMail(this.mail).subscribe({
          // next: (v) => console.log(v),
        });
        alert("Merci pour votre commande. Vous allez bientôt recevoir un mail de confirmation.");
        localStorage.clear();
        this.router.navigate(['/home'])
      } else {
        alert("Vous devez accepter les conditions générales d'utilisation pour continuer")
      }
    };

  }
}
