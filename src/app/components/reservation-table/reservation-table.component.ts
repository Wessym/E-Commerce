import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnnonceService } from 'src/app/services/annonce.service';
import { CommandeService } from 'src/app/services/commande.service';

@Component({
  selector: 'app-reservation-table',
  templateUrl: './reservation-table.component.html',
  styleUrls: ['./reservation-table.component.css']
})
export class ReservationTableComponent implements OnInit {
  annonces: any;
  connectedUser: any;
  connectedUserCommandes: any;
  commandesTab: any = [] ;


  constructor(private commandeService: CommandeService, private annonceService: AnnonceService, private router: Router) { }

  ngOnInit() {
    // get connectedUser from LS
    this.connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
    this.annonces = JSON.parse(localStorage.getItem('annonces'));



    this.commandeService.getAllCommandes().subscribe(
      (response) => {
        let commandes = response.commandes;
        
        for (let i = 0; i < commandes.length; i++) {

          for (let j = 0; j < this.annonces.length; j++) {
            if ((this.annonces[j]._id == commandes[i].idAnnonce) && (this.connectedUser._id == commandes[i].idUser)) {
              
              commandes[i].anouncerFirstName = this.annonces[j].anouncerFirstName;
              commandes[i].anouncerLastName = this.annonces[j].anouncerLastName;
              commandes[i].description = this.annonces[j].description;
              commandes[i].price = this.annonces[j].price;
              commandes[i].title = this.annonces[j].title;
              
            }
          }
        }
        console.log("aslema", commandes);
        let k = 0;
        for (let i = 0; i < commandes.length; i++) {
          if (commandes[i].idUser == this.connectedUser._id) {
            this.commandesTab[k] = commandes[i];
            k = k + 1 ;
          }
          
        }
        localStorage.setItem('connectedUserCommandes', JSON.stringify(this.commandesTab));
        this.connectedUserCommandes = JSON.parse(localStorage.getItem('connectedUserCommandes'));
      }
    );




    
  }

}
