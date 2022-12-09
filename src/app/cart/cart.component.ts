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
  produit$!: Observable<Produit>;


  constructor(
    public cartService: CartService,
    public httpService: HttpService,
  ) { }

  ngOnInit(): void {
    this.session = this.cartService.getItemFromCart();
    const restoredSession = JSON.parse(this.session);
    // console.log(restoredSession.items);
    this.items = restoredSession.items;
    this.items.forEach((element: any) => {
      console.log({ element },);
    
      // this.produit$ = this.httpService.getProduitById(this.items.productId);
      // console.log(this.produit$)
    });

  }
}
