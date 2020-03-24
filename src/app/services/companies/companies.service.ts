import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Companies } from 'src/app/models/companies/companies';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  constructor(private _http: Http, private _authService: AuthenticationService) { }
  private baseUrl: string = "http://localhost:8080/company";
  // private headers=new Headers({'content-type':'application/json'});
  private header = new Headers({ "Authorization": 'Bearer ' + this._authService.jwt, "Content-Type": "application/json" })
  private options = new RequestOptions({ headers: this.header });

  private companies = new Companies();

  //errorHandler
  errorHandler(error: Response) {
    return Observable.throw(error || "server Error");

  }

  //get all roles
  getCompanies() {
    return this._http.get(this.baseUrl, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }


  getCompanie(id: Number) {
    return this._http.get(this.baseUrl + '/' + id, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  deleteCompanies(id: Number) {

    return this._http.delete(this.baseUrl + '/' + id, this.options)
      .catch(this.errorHandler);
  }

  createCompanies(companies: Companies) {
    return this._http.post(this.baseUrl, JSON.stringify(companies), this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }
  //update users
  updateCompanies(companies: Companies) {
    console.log(companies);
    return this._http.put(this.baseUrl, JSON.stringify(companies), this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  setter(companies: Companies) {
    this.companies = companies;
  }
  getter() {
    return this.companies;
  }
}
