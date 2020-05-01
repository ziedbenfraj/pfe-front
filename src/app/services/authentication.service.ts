import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  //the host
  host: string = "http://localhost:8080";
  // jwt variable
  jwt: string;
  //user name
  username;
  //  role
  role: string;

  constructor(private http: HttpClient, private router: Router) { }
  //login
  login(data) {
    return this.http.post(this.host + "/login", data, { observe: 'response' });
  }
  //save the token in local storage
  saveToken(jwt: string) {
    //save in local storage
    localStorage.setItem("Token", jwt);
    this.jwt = jwt;
    this.parseJWT();
  }

  //decode the jwt
  parseJWT() {
    let jwtHelper = new JwtHelperService();

    let objJWT = jwtHelper.decodeToken(this.jwt);

    //save username
    if (objJWT != null) {
      this.username = objJWT.sub;
      this.role = objJWT.roles;
    } else {
      console.log("ty a3mel login 9bal !!");
    }
  }

  // verify if it's an admin or not
  isAdmin() {
    return this.role == "ADMIN";
  }
  // verify if it's an admin or not
  isUser() {
    return this.role == "USER";
  }
  isAutheticated() {
    return (this.role != undefined && (this.isAdmin() || this.isUser()));

  }

  // get the token from local storage
  public getToken(): string {
    return localStorage.getItem('Token');
  }
  //load the token
  loadToken() {
    this.jwt = this.getToken();
    this.parseJWT();
  }
  logout() {
    localStorage.removeItem('Token');
    this.jwt = undefined;
    this.username = undefined;
    this.role = undefined;
    this.router.navigateByUrl('/');
  }
}
