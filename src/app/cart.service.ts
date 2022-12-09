import { Injectable } from '@angular/core';
import { Produit } from './models/produit.model';
import { ShoppingCart } from "./models/shopping-cart.model";
import { CartItem } from './models/cart-item.model';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private storageKey = 'cart';
  cart = null;
  
  constructor() { }

  public addItem(produit: Produit, quantity: number): void {
    const cart = this.retrieve();
    let item = cart.items.find((p) => p.productId === produit.id);
    if (item === undefined) {
      item = new CartItem();
      item.productId = produit.id;
      cart.items.push(item);
    }

    item.quantity += quantity;
    cart.items = cart.items.filter((cartItem) => cartItem.quantity > 0);

    // TODO stocker les item dans ce service !

    // if (cart.items.length === 0) {
    //   cart.deliveryOptionId = undefined;
    // }

    // this.calculateCart(cart);
    this.save(cart);
    // this.dispatch(cart);
  }

  private retrieve(): ShoppingCart {
    const cart = new ShoppingCart();
    // console.log('Storage = ', localStorage );
    const storedCart = localStorage.getItem(this.storageKey);
    if (storedCart) {
      cart.updateFrom(JSON.parse(storedCart));
    }
    return cart;
  }

  private save(cart: ShoppingCart): void {
    localStorage.setItem(this.storageKey, JSON.stringify(cart));
  }

  getItemFromCart(){
  return localStorage.getItem(this.storageKey);
  }
}
