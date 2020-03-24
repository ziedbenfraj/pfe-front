import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/observable/throw';

import { AuthenticationService } from '../authentication.service';
import { Departement } from 'src/app/models/departements/departement';



@Injectable({
  providedIn: 'root'
})
export class DepartementService {
  constructor(private _http: Http, private _authService: AuthenticationService) { }
  private baseUrl: string = "http://localhost:8080/departement";
  // private headers=new Headers({'content-type':'application/json'});
  private header = new Headers({ "Authorization": 'Bearer ' + this._authService.jwt, "Content-Type": "application/json" })
  private options = new RequestOptions({ headers: this.header });

  private departement = new Departement();

  //errorHandler
  errorHandler(error: Response) {
    return Observable.throw(error || "server Error");

  }

  //get all roles
  getDepartements() {
    return this._http.get(this.baseUrl, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }


  getDepartement(id: Number) {
    return this._http.get(this.baseUrl + '/' + id, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  deleteDepartement(id: Number) {

    return this._http.delete(this.baseUrl + '/' + id, this.options)
      .catch(this.errorHandler);
  }

  createDepartement(departement: Departement) {
    console.log("herre");
    console.log(departement);
    return this._http.post(this.baseUrl, JSON.stringify(departement), this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }
  //update users
  updateDepartement(departement: Departement) {
    console.log(departement);
    return this._http.put(this.baseUrl, JSON.stringify(departement), this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  setter(departement: Departement) {
    this.departement = departement;
  }
  getter() {
    return this.departement;
  }





}
