import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  commandeUrl: string = "http://localhost:3000/commandes"
  constructor(private http: HttpClient) { }




  addCommande(obj) {
    return this.http.post<{ message: string, err: any }>(`${this.commandeUrl}/add-commande`, obj);
  }





  getAllCommandes() {
    return this.http.get<{ commandes: any }>(`${this.commandeUrl}/getAllCommandes`);
  }




  getCommandesByIdAnnonce(id) {
    return this.http.get<{ commandes: any }>(`${this.commandeUrl}/getCommandesByIdAnnonce/${id}`);
  }




  confirmCommand(idCmd, idUser) {
    return this.http.put<{ message: any }>(`${this.commandeUrl}/updateStatus/${idCmd}`, { idUser });
  }






  getAllUsersWithTheirCommandes() {
    return this.http.get<{ AllUsersWithCommandes: any }>(`${this.commandeUrl}/getAllUsersWithTheirCommandes`);
  }





}
