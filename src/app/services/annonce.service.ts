import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnnonceService {
  annonceUrl: string = "http://localhost:3000/annonces"
  constructor(private http: HttpClient) { }






  addAnnounce(obj, img: File) {
    let formData = new FormData();
    formData.append('title', obj.title);
    formData.append('description', obj.description);
    formData.append('price', obj.price);
    formData.append('qty', obj.qty);
    formData.append('category', obj.category);
    formData.append('img', obj.img);
    formData.append('idUser', obj.idUser);
    return this.http.post<{ message: string, error: any, err: any }>(`${this.annonceUrl}/add-annonce`, formData);
  }



  getAllUsersWithTheirAnnonces() {
    return this.http.get<{ AllUsersWithAnnonces: any }>(`${this.annonceUrl}/getAllUsersWithTheirAnnonces`);
  }


  getAllAnnonces() {
    return this.http.get<{ annonces: any }>(`${this.annonceUrl}/getAllAnnonces`);
  }




  getAnnonceByCommandeIdAnnonce(id) {
    return this.http.get<{ annonce: any }>(`${this.annonceUrl}/getAnnonceByCommandeIdAnnonce/${id}`);
  }



  confirmAnnonce(idAnnonce) {
    return this.http.put<{ message: any }>(`${this.annonceUrl}/confirmAnnonce/${idAnnonce}`,idAnnonce);
  }

  deleteAnnonce(idAnnonce) {
    return this.http.delete<{ message: any }>(`${this.annonceUrl}/deleteAnnonce/${idAnnonce}`);
  }


  updateAnnounce(announce) {
    return this.http.put<{ message: string }>(`${this.annonceUrl}/updateAnnonce/${announce._id}`, announce);
  }




}
