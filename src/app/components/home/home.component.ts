import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnnonceService } from 'src/app/services/annonce.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allAnnoncesTab: any;
  connectedUserAnnonces: any;
  connectedUser: any;
  connectedUserAnnoncesTab: any;
  constructor(private router: Router, private annonceService: AnnonceService) { }

  ngOnInit() {
    this.connectedUser = JSON.parse(localStorage.getItem('connectedUser'));

    // fn display connected user announces
    this.annonceService.getAllUsersWithTheirAnnonces().subscribe(
      (response) => {
        for (let i = 0; i < response.AllUsersWithAnnonces.length; i++) {
          if (response.AllUsersWithAnnonces[i]._id == this.connectedUser._id) {
            this.connectedUserAnnoncesTab = response.AllUsersWithAnnonces[i].annonces;
            localStorage.setItem('connectedUserAnnonces', JSON.stringify(this.connectedUserAnnoncesTab));
          }
        }
      });
    this.connectedUserAnnonces = JSON.parse(localStorage.getItem('connectedUserAnnonces'));








  }

}
