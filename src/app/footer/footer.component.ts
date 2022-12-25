import { Component } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(
    public cartService: CartService,
  ) { }

  cookies() {
    this.cartService.openSnackBar('Pour le moment, miex vaut se rendre au supermarché le plus proche pour trouver des cookies ;)')
  }
}
