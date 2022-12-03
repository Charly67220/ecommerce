import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Produit } from './models/produit.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getAllProduit(): Observable<Produit[]> {
    return this.http.get<Produit[]>('https://jepromenevotrechien.com/dbprod.php')
  }

  getProduitById(produitId: number): Observable<Produit> {
    // return this.http.get<Produit>(`https://jepromenevotrechien.com/dbprodID.php?ID=5`);
    return this.http.get<Produit>(`https://jepromenevotrechien.com/dbprodID.php?ID=${produitId}`);
}
  
// WORKING :
//  getProd() {
//   this.http.get(`https://jepromenevotrechien.com/dbprodID.php?ID=5`)
//   .subscribe(response => {
//     console.log(response);
//   })
//  }

}
 

