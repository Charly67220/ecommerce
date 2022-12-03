import { Component } from '@angular/core';
import { Produit } from '../models/produit.model';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {
  page1 = true;
  page2 = false;

  produits$!: Observable<Produit[]>;

  constructor(
    public httpService: HttpService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.produits$ = this.httpService.getAllProduit();
  }

  displayPage(page: any) {
    if (page == '1') {
      this.page1 = true;
      this.page2 = false;

    };
    if (page == '2') {
      this.page2 = true;
      this.page1 = false;
    };
  }

  onViewProduct(num: any) {
    this.router.navigateByUrl(`product-single/${num}`);
  }
}
