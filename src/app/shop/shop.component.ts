import { Component } from '@angular/core';
import { Produit } from '../models/produit.model';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { LastService } from '../last.service';
// import { ShoppingCart } from '../models/shopping-cart.model';



@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {
  page1 = true;
  page2 = false;
  expedition!: string;
  sport!: string;
  alimentation!: string;
  voyage!: string;
  tabproduits: any[] = [];
  produits!: Produit[];
  filter: boolean = false;

  prods: any;

  produits$!: Observable<Produit[]>;
  myGridOptions: any;

  constructor(
    public httpService: HttpService,
    private router: Router,
    public cartService: CartService,
    public lastService: LastService,
  ) { }

  ngOnInit(): void {
    // this.httpService.getProduitByCat('').subscribe(data => {
    //   this.tabproduits = data
    // });
    this.produits$ = this.httpService.getAllProduit();
    const session = this.lastService.getRecentItem();
    if (session === null) {
      return
    } else {
      const restoredSession = JSON.parse(session);
      this.prods = restoredSession.items.reverse();
    };
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

  onCatFilter() {
    this.filter = true;
    this.tabproduits = this.httpService.filterByCat(this.expedition, this.sport, this.alimentation, this.voyage);
    if (!this.voyage && !this.alimentation && !this.sport && !this.expedition) {
      this.filter = false;
    }
  }

  addProductToCart(produit: Produit): void {
    this.cartService.addItem(produit, 1);
  }

  stockRecentItem(produit: Produit): void {
    this.onViewProduct(produit.id);
    this.lastService.stockProd(produit)
  }
}
