import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthenticationService } from '../authentication.service';
import { Observable } from 'rxjs';
import { Tyre } from 'src/app/models/tyre/tyre';

@Injectable({
  providedIn: 'root'
})
export class TyreService {

  constructor(private _http: Http, private _authService: AuthenticationService) { }
  private baseUrl: string = "http://localhost:8080/tyre";
  // private headers=new Headers({'content-type':'application/json'});
  private header = new Headers({ "Authorization": 'Bearer ' + this._authService.jwt, "Content-Type": "application/json" })
  private options = new RequestOptions({ headers: this.header });


  //  errorHandler
  errorHandler(error: Response) {
    return Observable.throw(error || "server Error");

  }

  //  get all tyre
  getTyres() {
    return this._http.get(this.baseUrl, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }
  // get Tyre
  getTyre(id: Number) {
    return this._http.get(this.baseUrl + '/' + id, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }
  // delete Tyre
  deleteTyre(id: Number) {
    return this._http.delete(this.baseUrl + '/' + id, this.options)
      .catch(this.errorHandler);
  }
  // create Tyre
  createTyre(tyre: Tyre) {
    return this._http.post(this.baseUrl, JSON.stringify(tyre), this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }
  // update Tyre
  updateTyre(tyre: Tyre) {
    return this._http.put(this.baseUrl, JSON.stringify(tyre), this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);

  }



}
