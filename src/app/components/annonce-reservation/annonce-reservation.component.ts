import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandeService } from 'src/app/services/commande.service';
import { MarketplaceService } from 'src/app/services/marketplace.service';

@Component({
  selector: 'app-annonce-reservation',
  templateUrl: './annonce-reservation.component.html',
  styleUrls: ['./annonce-reservation.component.css']
})
export class AnnonceReservationComponent implements OnInit {

  idAnnonce: any;
  currentAnnonce: any;
  annonces: any;
  connectedUser: any;
  errorMsg: any;



  constructor(private route: ActivatedRoute, private router: Router, private commandeService: CommandeService, private marketplaceService: MarketplaceService) { }

  ngOnInit() {
    // get connectedUser from LS
    this.connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
    // get all annonces from LS
    this.annonces = JSON.parse(localStorage.getItem("annonces"));

    // get the current annonce id from the path
    this.route.paramMap.subscribe(params => {
      this.idAnnonce = params.get('id');
    });

    // get the current annonces informations seppartly
    // for (let i = 0; i < this.annonces.length; i++) {
    //   if (this.annonces[i]._id == this.idAnnonce) {
    //     this.currentAnnonce = this.annonces[i];
    //     console.log("current annonce", this.currentAnnonce);
    //   }
    // }

    // Get announce information from api
    this.marketplaceService.getAnnonceById(this.idAnnonce).subscribe(
      (response) => {
        this.currentAnnonce = response;
      });

  }







  addCommande() {
    let commandeObj = { idUser: this.connectedUser._id, idAnnonce: this.idAnnonce };
    this.commandeService.addCommande(commandeObj).subscribe(
      (response) => {
        if (response.message == "commande saved with success") {
          this.router.navigate(['user-dashboard'])
        } else {
          this.errorMsg = "Something went wrong with ur annonce try again later"
        }
      });
  }











}
