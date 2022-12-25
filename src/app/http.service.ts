import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Produit } from './models/produit.model';
import { catchError, map } from 'rxjs/operators';
import { ShoppingCart } from './models/shopping-cart.model';
import { NgForm } from '@angular/forms';



@Injectable({
  providedIn: 'root'
})
export class HttpService {
  produits: any;
  email!: string;



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

  store(prod: Produit) {
    // console.log(prod, " <<< prod in httpService");
    return this.http.post(`https://charlygo.fr/dbfav.php`, { data: prod }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  sendMail(form: NgForm, cart: ShoppingCart) {
    // console.log(form);
    // console.log(form.value);

    // console.log(form.mail);
    // this.email = JSON.stringify(form.mail)
    // console.log(cart.itemsTotal, "<<<<<<<<<<<< Cart");
    // cart.items.forEach(element => {
    //   console.log(element.titre);
    //   console.log(element.quantity);
    // });
    // this.http.post(`https://charlygo.fr/dmail.php`, { email: form.mail }).subscribe({
    //   error: (e) => console.error(e),
    //   complete: () => console.info('complete')
    // });
    // this.http.post("https://charlygo.fr/dmail.php", {message : "ceci est un test", mail: form.mail});

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

      this.http
        .post("https://formspree.io/f/xyyozook", form, httpOptions).subscribe(results => {
          // console.log(results);
          // alert("Merci " + form.value.name + ", votre commande a bien été enregistrée ! ");
          alert("Merci, votre commande a bien été enregistrée ! ");
          window.location.reload();
        });
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


