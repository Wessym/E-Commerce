import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MustMatch } from 'src/app/validators/confirmPwd';
import { MustBe } from 'src/app/validators/pwdFormat';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  userForm: FormGroup;

  form: FormGroup;

  errorMsg: string;

  path: string;

  imagePreview: any;
  hidePassword: boolean = true;


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService) { }

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
      img: ["",[Validators.required]],
      terms: ["",[Validators.requiredTrue]]
    }, {
      validators: MustMatch("pwd", "confirmPwd"),
      
    })




  }

  signup() {

    let role = (this.path == "/SignupAdmin") ? "admin" : "user";
    this.userForm.value.role = role;



    this.userService.signup(this.userForm.value, this.userForm.value.img).subscribe(
      (response) => {
        console.log("here response after signup", response);
        if (response.message == "user saved with success") {
          Swal.fire({
            title: "Done",
            text: "Account created with sucess",
            icon: "success",
            showCancelButton: false,
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            allowEscapeKey: false
          }).then((value) => {
            if (value) {
              // custom action here
              this.router.navigate(['home']);
            }
          });
        } else {
          this.errorMsg = "Email Already Exist" ;
        }
      }
    )

  }



  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log("here file", file);

    this.userForm.patchValue({ img: file });
    this.userForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
  }



  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

}

