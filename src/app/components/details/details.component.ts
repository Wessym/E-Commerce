import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandeService } from 'src/app/services/commande.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  connectedUser: any;
  annonces: any;
  commandes: any;
  currentAnnonce: any;
  idAnnonce: any;
  commandesTab:any;
  status:any;

  usersThatReserved: any;

  constructor(private route: ActivatedRoute, private router: Router, private commandeService: CommandeService, private userService: UserService) { }

  ngOnInit() {
    // get connectedUser from LS
    this.connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
    // get all annonces from LS
    this.annonces = JSON.parse(localStorage.getItem("annonces"));
    // get all commandes from LS
    this.commandesTab = JSON.parse(localStorage.getItem("commandes"));


    // get the current annonce id from the path
    this.route.paramMap.subscribe(params => {
      this.idAnnonce = params.get('id');
    });

    // get the current annonces informations seppartly
    for (let i = 0; i < this.annonces.length; i++) {
      if (this.annonces[i]._id == this.idAnnonce) {
        this.currentAnnonce = this.annonces[i];
        console.log("current annonce", this.currentAnnonce);
      }
    };

    for (let i = 0; i < this.commandesTab.length; i++) {
      if (this.commandesTab[i].idAnnonce == this.currentAnnonce._id) {
        this.status = this.commandesTab[i].status
      }        
    }


    this.commandeService.getCommandesByIdAnnonce(this.idAnnonce).subscribe(
      (result) => {
        this.commandes = result;
        
        for (let i = 0; i < this.commandes[0].users.length; i++) {
          this.commandes[0].users[i].idCommand = this.commandes[0]._id;
        }
        this.usersThatReserved = this.commandes[0].users;
        console.log("usersThatReserved", this.usersThatReserved);
      }
    )


  }



  confirmCommand(_id, _idUser) {
    //  update command status
    console.log("id commande",_id);
    console.log("id user",_idUser);
    
    this.commandeService.confirmCommand(_id, _idUser).subscribe(
      (response) => {
        if (response.message == "1") {
          Swal.fire({
            title: "Done",
            text: "Command confirmed successfully",
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
            text: "There was an error while confirming the command",
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
