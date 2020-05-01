import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { AuthenticationService } from '../authentication.service';
import { User } from 'src/app/models/users/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: Http, private _authService: AuthenticationService) { }
  private baseUrl: string = "http://localhost:8080/user";
  // private headers=new Headers({'content-type':'application/json'});
  private header = new Headers({ "Authorization": 'Bearer ' + this._authService.jwt, "Content-Type": "application/json" })
  private options = new RequestOptions({ headers: this.header });

  private user = new User();

  //errorHandler
  errorHandler(error: Response) {
    return Observable.throw(error || "server Error");

  }

  // get all Users
  getUsers() {
    return this._http.get(this.baseUrl, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }
  // get User
  getUser(id: Number) {
    return this._http.get(this.baseUrl + '/' + id, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }
  // delete User
  deleteUser(id: Number) {
    return this._http.delete(this.baseUrl + '/' + id, this.options)
      .catch(this.errorHandler);
  }
  // create User
  createUser(user: User) {
    console.log(user);
    return this._http.post(this.baseUrl, JSON.stringify(user), this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }
  // update user
  updateUser(user: User) {
    console.log(user);
    return this._http.put(this.baseUrl, JSON.stringify(user), this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }
}
