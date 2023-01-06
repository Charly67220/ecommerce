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
  defined: boolean = false;

  constructor(
    public cartService: CartService,
  ) { }
  ngOnInit(): void {
    this.session = this.cartService.getItemFromCart();
    if (this.session === null) {
      this.defined = false;
      return;
    } else {
      this.restoredSession = JSON.parse(this.session);
      this.defined = true;
    };
    // console.log(localStorage)
  }

  reload() {
    this.ngOnInit();
  }
}
