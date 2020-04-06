import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Measures } from 'src/app/models/measures/measures';

@Injectable({
  providedIn: 'root'
})
export class MeasuresService {

  constructor(private _http: Http, private _authService: AuthenticationService) { }
  private baseUrl: string = "http://localhost:8080/measure";
  // private headers=new Headers({'content-type':'application/json'});
  private header = new Headers({ "Authorization": 'Bearer ' + this._authService.jwt, "Content-Type": "application/json" })
  private options = new RequestOptions({ headers: this.header });


  //  errorHandler
  errorHandler(error: Response) {
    return Observable.throw(error || "server Error");

  }

  //  get all Measures
  getMeasures() {
    return this._http.get(this.baseUrl, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  };

  getMeasure(id: Number) {
    return this._http.get(this.baseUrl + '/' + id, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  deleteMeasure(id: Number) {
    return this._http.delete(this.baseUrl + '/' + id, this.options)
      .catch(this.errorHandler);
  }

  createMeasure(Measure: Measures) {
    return this._http.post(this.baseUrl, JSON.stringify(Measure), this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }
  //update users
  updateMeasure(Measure: Measures) {
    return this._http.put(this.baseUrl, JSON.stringify(Measure), this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
      
  }
}
