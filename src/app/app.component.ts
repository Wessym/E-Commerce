import { Component, Input, OnInit } from '@angular/core';
import { AnnonceService } from './services/annonce.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Forsti';
  message: string;

  constructor(private annonceService: AnnonceService) { }

  ngOnInit() {
    let connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
    this.message = connectedUser.role;
    console.log("this is the connected user", connectedUser);

  }





}
