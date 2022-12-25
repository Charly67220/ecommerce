import { Injectable } from '@angular/core';
import { Produit } from './models/produit.model';
import { ShoppingCart } from "./models/shopping-cart.model";
import { CartItem } from './models/cart-item.model';
import { MatSnackBar } from '@angular/material/snack-bar';

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

    // cart.items = cart.items.filter((cartItem) => cartItem.quantity > 0);

    this.calculateCart(cart);
    this.save(cart);
    this.openSnackBar('Produit ajouté au panier !');
  }

  public deleteItem(produit: Produit) {
    const cart = this.retrieve();
    cart.items = cart.items.filter((item) => item.titre !== produit.titre);
    this.calculateCart(cart);
    this.save(cart);
  }

  public updateQte(itemLive: CartItem, quantity: number): void {
    const cart = this.retrieve();
    if (quantity === 0) {
      cart.items = cart.items.filter((item) => item.titre !== itemLive.titre);
    }
    else {
      let item = cart.items.find((p) => p.productId === itemLive.productId);
      if (item === undefined) {
        item = new CartItem();
        item.productId = itemLive.productId;
        cart.items.push(item);
      }
      item.quantity = quantity;
    }
    this.calculateCart(cart);
    this.save(cart);
    if (quantity === 0) {
      // pour éviter que l'utilisateur remette une quantité pour un item qui à été supprimé
      location.reload();
    }
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

  private calculateCart(cart: ShoppingCart): void {
    cart.grossTotal = cart.items
      .map((item) => item.quantity * item.prixap)
      .reduce((previous, current) => previous + current, 0);
    cart.itemsTotal = cart.items
      .map((item) => item.quantity)
      .reduce((previous, current) => previous + current, 0);
      // deliveryTotal
      if (cart.grossTotal > 49) {
        cart.deliveryTotal = "Offerts";
        cart.checkOut = cart.grossTotal;
      } else {
        cart.deliveryTotal = "8 €";
        cart.checkOut = cart.grossTotal + 8;
      };
  }

  calcDelivery() {
  
  }

  getItemFromCart() {
    return localStorage.getItem(this.storageKey);
  }

  openSnackBar(text: any) {
    this._snackBar.open( text, 'Splash', {
      horizontalPosition: "right",
      verticalPosition: "top",
      duration: 2000,
    });
  }

}
