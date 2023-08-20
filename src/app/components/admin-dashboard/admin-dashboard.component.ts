import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnnonceService } from 'src/app/services/annonce.service';
import { CommandeService } from 'src/app/services/commande.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  connectedUser: any;
  commandesTab: any;
  annoncesTab: any;
  usersTab: any;
  filteredUsers: any[] = [];

  private _searchTerm: string = '';
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredUsers = this.filterUsers(value);
  }

  constructor(private router: Router, private annonceService: AnnonceService, private commandeService: CommandeService, private userService: UserService) { }

  filterUsers(searchString: string) {
    return this.usersTab.filter(user =>
      user.email.toLowerCase().includes(searchString.toLowerCase())
    );
  }

  ngOnInit() {
    this.connectedUser = JSON.parse(localStorage.getItem('connectedUser'));

    this.commandeService.getAllCommandes().subscribe(
      (response) => {
        this.commandesTab = response.commandes;
      });

    this.annonceService.getAllAnnonces().subscribe(
      (response) => {
        this.annoncesTab = response.annonces;
      });

    this.userService.getAllUsers().subscribe(
      (response) => {
        let j = 0;
        const users = [];
        for (let i = 0; i < response.users.length; i++) {
          if (response.users[i].role != "admin") {
            users[j] = response.users[i];
            j++;
          }
        }
        this.usersTab = users;
        this.filteredUsers = this.filterUsers(this.searchTerm);
      });
  }

  confirmAnnonce(idAnnonce) {
    this.annonceService.confirmAnnonce(idAnnonce).subscribe(
      (response) => {
        if (response.message == "1") {
          let annonce = this.annoncesTab.find(a => a._id === idAnnonce);
          if (annonce) {
            annonce.status = "Confirmed";
          }
        } else {
          alert("Error updating command status");
        }
      },
      (error) => {
        console.log(error);
        alert("Error updating command status");
      }
    )
  }

  deleteAnnonce(idAnnonce) {
    this.annonceService.deleteAnnonce(idAnnonce).subscribe(
      (response) => {
        if (response.message == "1") {
          Swal.fire({
            title: "Done",
            text: "Announce deleted with success",
            icon: "success",
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
          Swal.fire({
            title: "Error",
            text: "There was an error while deleting the announce",
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
        }
      }
    )
  }
}
