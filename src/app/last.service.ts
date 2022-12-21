import { Injectable } from '@angular/core';
import { CartItem } from './models/cart-item.model';
import { Produit } from './models/produit.model';
import { ShoppingCart } from './models/shopping-cart.model';

@Injectable({
  providedIn: 'root'
})
export class LastService {

  private storageKey = 'recent';

  constructor() { }

  private retrieve(id: any): ShoppingCart {
    const recentProd = new ShoppingCart();
    const storedCart = sessionStorage.getItem(this.storageKey);
    if (storedCart) {
      recentProd.updateFrom(JSON.parse(storedCart));
    }
    let prod = recentProd.items.find((p) => p.productId === id);

    if (recentProd.items.length > 4 && prod === undefined) {
       recentProd.items = recentProd.items.slice(1, 5);
      return recentProd;
    }
    // console.log(recentProd);
    return recentProd;
  }

  private save(recentProd: ShoppingCart): void {
    sessionStorage.setItem(this.storageKey, JSON.stringify(recentProd));
  }

  getRecentItem() {
    return sessionStorage.getItem(this.storageKey);
  }

  stockItem(itemCart: CartItem) {
    const recentProd = this.retrieve(itemCart.productId);
    let prod = recentProd.items.find((p) => p.productId === itemCart.productId);
    // controle la présence de l'article...... ^
    if (prod === undefined) {
      prod = new CartItem();
      prod.productId = itemCart.productId;
      recentProd.items.push(prod);
    }
    prod.quantity = 1;
    prod.imageURL = itemCart.imageURL;
    prod.prixap = itemCart.prixap;
    prod.titre = itemCart.titre;
    
    console.log(recentProd, "<< recentProd après slice");
    this.save(recentProd);
  }

  stockProd(produit: Produit) {
    const recentProd = this.retrieve(produit.id);
    let prod = recentProd.items.find((p) => p.productId === produit.id);
    
    if (prod === undefined) {
      prod = new CartItem();
      prod.productId = produit.id;
      recentProd.items.push(prod);
    }

    prod.quantity = 1;
    prod.imageURL = produit.imageURL;
    prod.prixap = produit.prixap;
    prod.titre = produit.titre;

    this.save(recentProd)
  }

}
