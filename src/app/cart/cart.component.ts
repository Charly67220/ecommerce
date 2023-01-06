import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { HttpService } from '../http.service';
import { LastService } from '../last.service';
import { CartItem } from '../models/cart-item.model';
import { Produit } from '../models/produit.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  session: any;
  restoredSession: any;
  items: any;
  total!: number;
  subTotal: number = 0;
  checkOut: number = 0;
  empty!: string;
  delivery!: string;
  code!: string;
  defined: boolean = false;


  constructor(
    public cartService: CartService,
    public httpService: HttpService,
    public lastService: LastService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.session = this.cartService.getItemFromCart();
    if (this.session === null) {
      this.empty = "Votre panier est vide !";
      this.defined = false;
    } else {
      this.restoredSession = JSON.parse(this.session);
      this.items = this.restoredSession.items;
      this.defined = true;
      if (this.items.length === 0) {
        this.empty = "Votre panier est vide !";
        this.defined = false;
      }
    };
  }



  reload() {
    this.ngOnInit();
  }

  changeQuantity(item: CartItem, qte: number): void {
    this.cartService.updateQte(item, qte);
    this.reload();
  }

  removeProductFromCart(product: Produit): void {
    this.cartService.deleteItem(product);
    this.reload();
  }

  discardCart() {
    localStorage.clear();
    location.reload();
  }

  stockRecentItem(product: CartItem): void {
    this.lastService.stockItem(product);
  }

  onSubmitForm(form: NgForm) {
    if (form.value.code === "supercoupon2022") {
      this.restoredSession.checkOut = this.restoredSession.grossTotal - 120;
      if (this.restoredSession.checkOut < 0) {
        this.restoredSession.grossTotal = 0;
        this.restoredSession.checkOut = 0;
        this.restoredSession.deliveryTotal = "Offerts";
      } else {
        this.restoredSession.grossTotal = this.restoredSession.checkOut;
      };
      this.cartService.openSnackBar('Votre coupon de réduction a bien été pris en compte');
    }
  }

  checkOUT() {
    if (this.empty !== "Votre panier est vide !") {
      this.router.navigate(['/checkout']);
    }
  }
}
