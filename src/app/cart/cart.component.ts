import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from '../cart.service';
import { HttpService } from '../http.service';
import { CartItem } from '../models/cart-item.model';
import { Produit } from '../models/produit.model';
import { ShoppingCart } from '../models/shopping-cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  session: any
  items: any
  nbitems!: number;
  total!: number;
  subTotal: number = 0;
  empty!: string;


  constructor(
    public cartService: CartService,
    public httpService: HttpService,
  ) { }

  ngOnInit(): void {
    this.session = this.cartService.getItemFromCart();
    const restoredSession = JSON.parse(this.session);
    this.items = restoredSession.items;
    this.items.forEach((item: any) => {
      this.nbitems += item.quantity;
      this.total = item.prixap * item.quantity
      this.subTotal += this.total
    });
    if (this.items.length === 0) {
      this.empty = "Votre panier est vide !";
    }

  }

  public removeProductFromCart(product: Produit): void {
    this.cartService.deleteItem(product);
    location.reload();
  }
}
