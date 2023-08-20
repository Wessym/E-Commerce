import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnnonceService } from 'src/app/services/annonce.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  connectedUser: any;
  connectedUserAnnonces: any;
  annoncesTab: any;
  allAnnoncesTab: any = [];

  anouncerFirstName: any;
  anouncerLastName: any;

  tab: any = {};

  minPrice: number;
  maxPrice: number;


  constructor(private router: Router, private annonceService: AnnonceService, private userService: UserService) { }

  ngOnInit() {
    this.connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
    this.connectedUserAnnonces = JSON.parse(localStorage.getItem('connectedUserAnnonces'));


    // fn get all annonces
    this.annonceService.getAllAnnonces().subscribe(
      (response) => {
        let annonces = response.annonces;

        for (let i = 0; i < annonces.length; i++) {

          // fn get user by annonces user id
          this.userService.getUserByAnnonceUserId(annonces[i].idUser).subscribe(
            (response) => {

              this.anouncerFirstName = response.user.firstName;
              this.anouncerLastName = response.user.lastName;

              this.tab = annonces[i];
              this.tab.anouncerFirstName = this.anouncerFirstName;
              this.tab.anouncerLastName = this.anouncerLastName;
              console.log("here tab", this.tab);
              localStorage.setItem('annonces', JSON.stringify(this.allAnnoncesTab));
            });
          this.allAnnoncesTab[i] = annonces[i];


        }

      }
    );

    this.annoncesTab = JSON.parse(localStorage.getItem('annonces'));
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
