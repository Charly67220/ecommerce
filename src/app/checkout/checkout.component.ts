import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { NgForm } from '@angular/forms';
import { HttpService } from '../http.service';

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
  mail!: string;
  conditions: boolean = false;

  constructor(
    public cartService: CartService,
    public httpService: HttpService,
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
    if (form.value.mail == undefined) {
      alert("Veuillez indiquer votre email.");
      window.location.reload;
    } else {
      if (this.conditions) {
        // alert("Merci " + form.value.prénom + " pour votre commande. Vous allez bientôt recevoir un mail de confirmation !");
        this.httpService.sendMail(form.value, this.restoredSession);
      } else {
        alert("Vous devez accepter les conditions générales d'utilisation pour continuer")
      }
    }
  
  }
}
