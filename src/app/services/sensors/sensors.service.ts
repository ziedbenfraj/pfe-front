import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Sensors } from 'src/app/models/sensors/sensors';

@Injectable({
  providedIn: 'root'
})
export class SensorsService {

  constructor(private _http: Http, private _authService: AuthenticationService) { }
  private baseUrl: string = "http://localhost:8080/sensor";
  // private headers=new Headers({'content-type':'application/json'});
  private header = new Headers({ "Authorization": 'Bearer ' + this._authService.jwt, "Content-Type": "application/json" })
  private options = new RequestOptions({ headers: this.header });


  //  errorHandler
  errorHandler(error: Response) {
    return Observable.throw(error || "server Error");

  }

  //  get all roles
  getSensors() {
    return this._http.get(this.baseUrl, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  };

  getSensor(id: Number) {
    return this._http.get(this.baseUrl + '/' + id, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  deleteSensor(id: Number) {
    return this._http.delete(this.baseUrl + '/' + id, this.options)
      .catch(this.errorHandler);
  }

  createSensor(sensor: Sensors) {
    return this._http.post(this.baseUrl, JSON.stringify(sensor), this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }
  //update users
  updateSensor(sensor: Sensors) {
    console.log(sensor);
    return this._http.put(this.baseUrl, JSON.stringify(sensor), this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }
}
