import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {
  annonceUrl: string = "https://fakestoreapi.com/products"
  constructor(private http: HttpClient) { }






  getAllAnnonces() {
    return this.http.get<{ annonces: any }>(this.annonceUrl);
  }

  getAnnonceById(id) {
    return this.http.get<{ annonce: any }>(`${this.annonceUrl}/${id}`);
  }



}
