import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MarketplaceService } from 'src/app/services/marketplace.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css']
})
export class MarketplaceComponent implements OnInit {

  connectedUser: any;
  connectedUserAnnonces: any;

  annoncesTab: any;
  allAnnoncesTab: any;
  minPrice: number;
  maxPrice: number;

  constructor(private MarketplaceService: MarketplaceService, private router: Router) { }

  ngOnInit() {
    this.connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
    this.connectedUserAnnonces = JSON.parse(localStorage.getItem('connectedUserAnnonces'));

    this.MarketplaceService.getAllAnnonces().subscribe((response) => {
      console.log("this is response :", response);
      this.annoncesTab = response;
      this.allAnnoncesTab = this.annoncesTab;
    })

  }






  goToAnnonceReservation(id) {
    if (!this.connectedUser) {
      Swal.fire({
        title: "Error",
        text: "You should be logged in to perform this action",
        icon: "error",
        showCancelButton: false,
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((value) => {
        if (value) {
          // custom action here
        }
      });
    } else {
      this.router.navigate([`annonceReservation/${id}`]);
    }
  }





  searchByPrice() {
    let allAnnoncesTab = this.annoncesTab;
    if (this.minPrice == null && this.maxPrice == null) {
      this.annoncesTab = allAnnoncesTab;

    } else if (this.minPrice != null && this.maxPrice != null) {
      this.annoncesTab = this.allAnnoncesTab.filter(x => x.price >= this.minPrice && x.price <= this.maxPrice);
    }
  }
  clearSearch() {
    this.minPrice = null;
    this.maxPrice = null;
    this.annoncesTab = this.allAnnoncesTab;
  }







}
