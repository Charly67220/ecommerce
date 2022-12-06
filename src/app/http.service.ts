import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Produit } from './models/produit.model';
import { filter } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  produits: any;

  constructor(private http: HttpClient) { }

  getAllProduit(): Observable<Produit[]> {
    return this.http.get<Produit[]>('https://charlygo.fr/dbprod.php')
  }

  getProduitById(produitId: number): Observable<Produit> {
    return this.http.get<Produit>(`https://charlygo.fr/dbprodID.php?ID=${produitId}`);
  }

  getProduitByCat(cat: string): Observable<Produit[]> {
    return this.http.get<Produit[]>(`https://charlygo.fr/dbprodCat.php?categorie=${cat}`);
  }

  // WORKING :
  //  getProd() {
  //   this.http.get(`https://charlygo.fr/dbprodID.php?ID=5`)
  //   .subscribe(response => {
  //     console.log(response);
  //   })
  //  }

}


