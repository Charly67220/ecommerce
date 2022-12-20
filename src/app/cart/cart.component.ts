import { Component } from '@angular/core';
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


  constructor(
    public cartService: CartService,
    public httpService: HttpService,
    public lastService: LastService,
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
    if (this.restoredSession.grossTotal > 49) {
      this.delivery = "Offerts";
      this.checkOut = this.restoredSession.grossTotal;
    } else {
      this.delivery = "8 €";
      this.checkOut = this.restoredSession.grossTotal + 8;
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
}
