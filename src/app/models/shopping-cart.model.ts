import { CartItem } from "./cart-item.model";

export class ShoppingCart {
  public items: CartItem[] = new Array<CartItem>();
  public itemsTotal: number = 0;
  public grossTotal: number = 0;
  public deliveryTotal!: string;
  public checkOut: number = 0;


  public updateFrom(src: ShoppingCart) {
    this.items = src.items;
    this.itemsTotal = src.itemsTotal;
    this.grossTotal = src.grossTotal;
    this.deliveryTotal = src.deliveryTotal;
    this.checkOut = src.checkOut;
  }
}