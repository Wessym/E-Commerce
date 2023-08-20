import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent implements OnInit {

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






  search() {
    console.log("hedha houa ", this.searchTerm);
    this.router.navigate(['signup']);
  }



  navigateWithRefresh(path) {
    const urlTree = this.router.createUrlTree([path]);
    const url = this.router.serializeUrl(urlTree);
    window.location.href = url;
  }  
}
