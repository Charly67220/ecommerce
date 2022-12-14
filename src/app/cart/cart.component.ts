import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { HttpService } from '../http.service';
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
      this.items.forEach((item: any) => {
        this.total = item.prixap * item.quantity;
        this.subTotal += this.total;
      });
    };
    if (this.subTotal > 49) {
      this.delivery = "Offerts";
      this.checkOut = this.subTotal;
    } else {
      this.delivery = "8 €";
      this.checkOut = this.subTotal + 8;
    }
  }

  reload() {
    location.reload();
  }

  changeQuantity(item: CartItem, qte: number): void {
    this.cartService.updateQte(item, qte);
  }

  removeProductFromCart(product: Produit): void {
    this.cartService.deleteItem(product);
    this.reload();
  }  

  discardCart() {
    localStorage.clear();
    this.reload();
  }
}
