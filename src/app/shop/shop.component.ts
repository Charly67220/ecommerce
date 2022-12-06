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
  expedition!: string;
  sport!: string;
  alimentation!: string;
  voyage!: string;
  

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

  onCatFilter() {
    console.log(this.expedition);
  
    //initialisation à 0 :
    this.produits$ = this.httpService.getProduitByCat('');
    if (this.sport){
      this.produits$ = this.httpService.getProduitByCat('sport');
    }
    if (this.expedition){
      this.produits$ = this.httpService.getProduitByCat('expedition');
    }
    if (this.alimentation){
      this.produits$ = this.httpService.getProduitByCat('alimentation');
    }
    if (this.voyage){
      this.produits$ = this.httpService.getProduitByCat('voyage');
    }
  }
}
