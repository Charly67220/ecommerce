import { Injectable } from '@angular/core';
import { Produit } from './models/produit.model';
import { ShoppingCart } from "./models/shopping-cart.model";
import { CartItem } from './models/cart-item.model';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})

export class CartService {

  private storageKey = 'cart';
  cart = null;


  constructor(public _snackBar: MatSnackBar) { }

  public addItem(produit: Produit, quantity: number): void {
    const cart = this.retrieve();
    let item = cart.items.find((p) => p.productId === produit.id);
    if (item === undefined) {
      item = new CartItem();
      item.productId = produit.id;
      cart.items.push(item);
    }

    item.quantity += quantity;
    item.imageURL = produit.imageURL;
    item.prixap = produit.prixap;
    item.titre = produit.titre;

    cart.items = cart.items.filter((cartItem) => cartItem.quantity > 0);

    this.save(cart);
    this.openSnackBar();
  }

  public deleteItem(produit: Produit) {
    const cart = this.retrieve();
    cart.items = cart.items.filter((item) => item.titre !== produit.titre);
    this.save(cart);
  }

  private retrieve(): ShoppingCart {
    const cart = new ShoppingCart();
    const storedCart = localStorage.getItem(this.storageKey);
    if (storedCart) {
      cart.updateFrom(JSON.parse(storedCart));
    }
    return cart;
  }

  private save(cart: ShoppingCart): void {
    localStorage.setItem(this.storageKey, JSON.stringify(cart));
  }

  getItemFromCart() {
    return localStorage.getItem(this.storageKey);
  }

  openSnackBar() {
    this._snackBar.open('Produit ajouté au panier !', 'Splash', {
      horizontalPosition: "right",
      verticalPosition: "top",
      duration: 2000,
    });
  }
}
