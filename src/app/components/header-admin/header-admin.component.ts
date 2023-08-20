import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent implements OnInit {
  searchTerm: string;

  avatar: any;
  connectedUser: any ;
  constructor(private router: Router) { }

  ngOnInit() {
    this.connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
  }


  logout(){
    localStorage.removeItem("connectedUser");
    localStorage.removeItem("connectedUserAnnonces");
    localStorage.removeItem("connectedUserCommandes");
    this.navigateWithRefresh("home");
  }






  navigateWithRefresh(path) {
    const urlTree = this.router.createUrlTree([path]);
    const url = this.router.serializeUrl(urlTree);
    window.location.href = url;
  }  


}
