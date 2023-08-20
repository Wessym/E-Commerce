import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl: string = "http://localhost:3000/users"
  constructor(private http: HttpClient) { }


  login(obj) {
    return this.http.post<{ message: string, user: any }>(`${this.userUrl}/login`, obj);
  }


  signup(obj, img: File) {
    let formData = new FormData();
    formData.append('firstName', obj.firstName);
    formData.append('lastName', obj.lastName);
    formData.append('email', obj.email);
    formData.append('pwd', obj.pwd);
    formData.append('tel', obj.tel);
    formData.append('adresse', obj.adresse);
    if (!img) {
      formData.append('img', "defaultPic.png");
    } else {
      formData.append('img', obj.img);
    }
    formData.append('role', obj.role);
    return this.http.post<{ message: string, error: any, err: any }>(`${this.userUrl}/signup`, formData);
  }


  getUserByAnnonceUserId(id) {
    return this.http.get<{ user: any }>(`${this.userUrl}/getUserByAnnonceUserId/${id}`);
  }

  getUserById(id) {
    return this.http.get<{ user: any }>(`${this.userUrl}/getUserById/${id}`);
  }

  getAllUsers() {
    return this.http.get<{ users: any }>(this.userUrl);
  }



  getUserByName(name) {
    return this.http.get<{ user: any, msg: string }>(`${this.userUrl}/getUserByName/${name}`);
  }




}
