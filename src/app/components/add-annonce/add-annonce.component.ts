import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnonceService } from 'src/app/services/annonce.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-annonce',
  templateUrl: './add-annonce.component.html',
  styleUrls: ['./add-annonce.component.css']
})

export class AddAnnonceComponent implements OnInit {

  annonceForm: FormGroup;

  connectedUser: any;

  form: FormGroup;

  errorMsg: string;

  path: string;

  imagePreview: any;



  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private annonceService: AnnonceService) { }

  ngOnInit() {
    this.path = this.router.url;
    console.log("Here path from compo ", this.path);
    this.annonceForm = this.formBuilder.group({
      title: ["", [Validators.required, Validators.minLength(3)]],
      description: ["", [Validators.required, Validators.minLength(5)]],
      price: ["", [Validators.required]],
      qty: [""],
      category: ["", [Validators.required]],
      img: [""],
    });


  }


  addAnnounce() {

    let connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
    let idUser = connectedUser._id;
    this.annonceForm.value.idUser = idUser;

    this.annonceService.addAnnounce(this.annonceForm.value, this.annonceForm.value.img).subscribe(
      (response) => {
        console.log("here response after add annonce", response);
        if (response.message == "annonce saved with success") {
          this.router.navigate(['home'])
        } else {
          this.errorMsg = "Something went wrong with your annonce try again later"
        }
      }
    )

  }



  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log("here file", file);

    this.annonceForm.patchValue({ img: file });
    this.annonceForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
  }





}
