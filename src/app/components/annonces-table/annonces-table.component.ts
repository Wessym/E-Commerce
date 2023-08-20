import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AnnonceService } from 'src/app/services/annonce.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-annonces-table',
  templateUrl: './annonces-table.component.html',
  styleUrls: ['./annonces-table.component.css']
})
export class AnnoncesTableComponent implements OnInit {

  @ViewChild('editEmployeeModal', { static: false }) editEmployeeModal: ElementRef;

  connectedUser: any;
  connectedUserAnnonces: any;
  annoncesTab: any;
  announceForm: FormGroup;
  selectedAnnounce: any = {};

  constructor(private router: Router, private annonceService: AnnonceService) { }

  ngOnInit() {
    // get connectedUser from LS
    this.connectedUser = JSON.parse(localStorage.getItem('connectedUser'));

    // get connected user annonces
    this.annonceService.getAllUsersWithTheirAnnonces().subscribe(
      (response) => {
        for (let i = 0; i < response.AllUsersWithAnnonces.length; i++) {
          if (response.AllUsersWithAnnonces[i]._id == this.connectedUser._id) {
            this.annoncesTab = response.AllUsersWithAnnonces[i].annonces;
            localStorage.setItem('connectedUserAnnonces', JSON.stringify(this.annoncesTab));
          }
        }
      }
    );

    this.connectedUserAnnonces = JSON.parse(localStorage.getItem('connectedUserAnnonces'));
  }

  goToDetails(id) {
    this.router.navigate([`annonceDetails/${id}`]);
  }

  setSelectedAnnounce(announce) {
    this.selectedAnnounce = { ...announce };
  }

  updateAnnounce(event) {
    event.preventDefault();
    console.log("here selected announce :", this.selectedAnnounce);
    
    this.annonceService.updateAnnounce(this.selectedAnnounce)
      .subscribe((res) => {
        if (res.message == 'Edited with success') {
          const index = this.connectedUserAnnonces.findIndex(annonce => annonce._id === this.selectedAnnounce._id);
          this.connectedUserAnnonces[index] = this.selectedAnnounce;
          localStorage.setItem('connectedUserAnnonces', JSON.stringify(this.connectedUserAnnonces));

          // Close the modal
          this.editEmployeeModal.nativeElement.classList.remove('show');
          this.editEmployeeModal.nativeElement.style.display = 'none';
          document.body.classList.remove('modal-open');
          const modalBackdrops = document.getElementsByClassName('modal-backdrop');
          while(modalBackdrops.length > 0){
            modalBackdrops[0].parentNode.removeChild(modalBackdrops[0]);
          }

          Swal.fire({
            title: "Done",
            text: "Announce updated with success",
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
          // Handle error
          Swal.fire({
            title: "Error",
            text: "There was a problem in updating the announce contact the admin",
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
      });
  }
}
