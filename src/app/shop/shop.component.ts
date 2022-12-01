import { Component } from '@angular/core';
import { Produit } from '../models/produit.model';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {

  produits$!: Observable<Produit[]>;

  constructor(
    public httpService: HttpService,
  ) { }

  ngOnInit(): void {
    this.produits$ = this.httpService.getAllProduit();
  }
}
