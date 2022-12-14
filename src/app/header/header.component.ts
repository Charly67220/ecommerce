import { Component } from '@angular/core';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  session: any;
  restoredSession: any;

  constructor(
    public cartService: CartService,
  ) { }
  ngOnInit(): void {
    this.session = this.cartService.getItemFromCart();
    this.restoredSession = JSON.parse(this.session);
    // console.log(localStorage)
  }
}
