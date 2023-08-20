import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnnonceService } from 'src/app/services/annonce.service';
import { CommandeService } from 'src/app/services/commande.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  connectedUserAnnonces: any;
  connectedUser: any;
  annoncesTab: any;
  connectedUserCommandes: any;
  constructor(private router: Router, private annonceService: AnnonceService, private commandeService: CommandeService, private userService: UserService) { }

  ngOnInit() {
    this.connectedUser = JSON.parse(localStorage.getItem('connectedUser'));

    this.connectedUserAnnonces = JSON.parse(localStorage.getItem('connectedUserAnnonces'));

    this.connectedUserCommandes = JSON.parse(localStorage.getItem('connectedUserCommandes'));

    this.commandeService.getAllCommandes().subscribe(
      (response) => {
        console.log("here all commandes response", response.commandes);
      }
    )


        // get all commandes and store in LS
        this.commandeService.getAllCommandes().subscribe(
          (response) => {
            console.log("here all commandes response", response.commandes);
            localStorage.setItem('commandes', JSON.stringify(response.commandes));
          }
        )

  }








}
