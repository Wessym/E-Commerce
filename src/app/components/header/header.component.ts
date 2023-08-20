import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnnonceService } from 'src/app/services/annonce.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() message : string ;
  connectedUser: any;
  role : string ;
    // form ID
    userForm: FormGroup;
    // user Object
    user: any = {};
    //  error msg
    errorMsg: string;
    errorMsgs: string;
  
    form: FormGroup;
  
  
    path: string;
  
    imagePreview: any;
  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder, private annonceService: AnnonceService) { }

  ngOnInit() {
    this.role = this.message ;
    this.path = this.router.url;
    this.userForm = this.formBuilder.group({
      pwd: ["", [Validators.required]],
      tel: ["", [Validators.required, Validators.min(10000000), Validators.max(99999999)]],
    }, {  
    })
  }









  login() {
    this.userService.login(this.userForm.value).subscribe((response) => {
      console.log('response after login', response);
      if (response.message != "2") {
        this.errorMsgs = "Please check Tel / Password"
      } else {
        console.log("here user id bro", response.user._id);
        localStorage.setItem('connectedUser', JSON.stringify(response.user));
        if (response.user.role == "admin") {
          this.navigateWithRefresh("admin-dashboard");
        } else {
          this.navigateWithRefresh("home");
        }
      }
    })
  };



  navigateWithRefresh(path) {
    const urlTree = this.router.createUrlTree([path]);
    const url = this.router.serializeUrl(urlTree);
    window.location.href = url;
  }





}
