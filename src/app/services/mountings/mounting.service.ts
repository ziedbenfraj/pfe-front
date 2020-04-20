import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/observable/throw';

import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class MountingService {

  constructor(private _http: Http, private _authService: AuthenticationService) { }
  private baseUrl: string = "http://localhost:8080/mounting";
  // private headers=new Headers({'content-type':'application/json'});
  private header = new Headers({ "Authorization": 'Bearer ' + this._authService.jwt, "Content-Type": "application/json" })
  private options = new RequestOptions({ headers: this.header });

  deleteMounting(id: Number) {

    return this._http.delete(this.baseUrl + '/' + id, this.options)
      .catch(this.errorHandler);
  }

  errorHandler(error: Response) {
    return Observable.throw(error || "server Error");

  }
}
