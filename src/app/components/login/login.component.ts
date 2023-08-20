import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AnnonceService } from 'src/app/services/annonce.service';
import { UserService } from 'src/app/services/user.service';
import { MustMatch } from 'src/app/validators/confirmPwd';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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

    this.path = this.router.url;
    this.userForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.email]],
      pwd: ["", [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      confirmPwd: [""],
      adresse: ["", [Validators.required]],
      tel: ["", [Validators.required, Validators.min(10000000), Validators.max(99999999)]],
      img: [""]
    }, {
      validators: MustMatch("pwd", "confirmPwd"),
      
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

  signup() {

    let role = (this.path == "/SignupAdmin") ? "admin" : "user";
    this.userForm.value.role = role;



    this.userService.signup(this.userForm.value, this.userForm.value.img).subscribe(
      (response) => {
        console.log("here response after signup", response);
        if (response.message == "user saved with success") {
          this.router.navigate(['login']);
        } else {
          this.errorMsg = "Email Already Exist" ;
        }
      }
    )

  }



  navigateWithRefresh(path) {
    const urlTree = this.router.createUrlTree([path]);
    const url = this.router.serializeUrl(urlTree);
    window.location.href = url;
  }



  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log("here file", file);
    if (file.type.match('image/jpeg') || file.type.match('image/png')) {
      // Process your file here
      this.userForm.patchValue({ img: file });
      this.userForm.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string
      };
      reader.readAsDataURL(file);
  } else {
      // File type is not allowed
      Swal.fire({
        title: "Error",
        text: "You should choose an image file",
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


}
