import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Produit } from './models/produit.model';
import { catchError, map } from 'rxjs/operators';


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

  postFavoriteProduit(prod: Produit) {
    this.http.post<any>('https://reqres.in/api/posts', { title: 'Angular POST Request Example' }).subscribe(data => {
      prod.id = data.id;
    })
  }

  store(prod: Produit) {
    // console.log(prod, " <<< prod in httpService");
    return this.http.post(`https://charlygo.fr/dbfav.php`,{ data: prod }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }


  filterByCat(expedition: string, sport: string, alimentation: string, voyage: string) {

    //initialisation à 0 :
    const tabproduits: Produit[] = []
    if (expedition) {
      console.log("expedition : ", expedition);
      this.getProduitByCat('expedition').subscribe(produits => {
        produits.forEach(produ => {
          tabproduits.push(produ)
        })
      })
    }
    if (sport) {
      this.getProduitByCat('sport').subscribe(produits => {
        produits.forEach(produ => {
          tabproduits.push(produ)
        })
      })
    }
    if (alimentation) {
      this.getProduitByCat('alimentation').subscribe(produits => {
        produits.forEach(produ => {
          tabproduits.push(produ)
        })
      })
    }
    if (voyage) {
      this.getProduitByCat('voyage').subscribe(produits => {
        produits.forEach(produ => {
          tabproduits.push(produ)
        })
      })
    }
    return tabproduits;
  }
}


