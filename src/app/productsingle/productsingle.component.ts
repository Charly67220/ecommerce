import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from '../models/produit.model';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart.service';
// import { filter } from 'rxjs/operators'
// import { KeyValuePipe } from '@angular/common';



@Component({
  selector: 'app-productsingle',
  templateUrl: './productsingle.component.html',
  styleUrls: ['./productsingle.component.scss']
})
export class ProductsingleComponent {

  produit$!: Observable<Produit>;
  produits$!: Observable<Produit[]>;

  produit: any;
  id!: number;
  titre!: string;
  ref!: string;
  imageURL!: string;
  prixav!: string;
  prixap!: number;
  presentation!: string;
  categorie!: string;
  description!: string;
  info!: string;
  commm!: string;

  produits: any = {};

  constructor(
    public httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router,
    public cartService: CartService,
  ) { }

  ngOnInit() {
    const produitId = +this.route.snapshot.params['id'];
    this.produit$ = this.httpService.getProduitById(produitId);
    this.produit$.subscribe(data => {
      this.produit = data;
      this.titre = this.produit[0].titre;
      this.ref = this.produit[0].ref;
      this.imageURL = this.produit[0].imageURL;
      this.prixav = this.produit[0].prixav;
      this.prixap = this.produit[0].prixap;
      this.presentation = this.produit[0].presentation;
      this.categorie = this.produit[0].categorie;
      this.description = this.produit[0].description;
      this.info = this.produit[0].info;
      this.commm = this.produit[0].commm;
      this.produits$ = this.httpService.getProduitByCat(this.categorie);
    });

  }

  onViewProduct(num: any) {
    const currentUrl = `product-single/${num}`;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

  addProductToCart(produit: Produit): void{
    this.cartService.addItem(this.produit[0], 1);
 }

}
