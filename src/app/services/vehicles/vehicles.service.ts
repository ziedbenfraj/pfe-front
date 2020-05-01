import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Companies } from 'src/app/models/companies/companies';
import { Observable } from 'rxjs';
import { Vehicles } from 'src/app/models/vehicles/vehicles';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  constructor(private _http: Http, private _authService: AuthenticationService) { }
  private baseUrl: string = "http://localhost:8080/vehicle";
  // private headers=new Headers({'content-type':'application/json'});
  private header = new Headers({ "Authorization": 'Bearer ' + this._authService.jwt, "Content-Type": "application/json" })
  private options = new RequestOptions({ headers: this.header });

  private Companie = new Companies();

  //  errorHandler
  errorHandler(error: Response) {
    return Observable.throw(error || "server Error");

  }

  //  get all Vehicles
  getVehicles() {
    return this._http.get(this.baseUrl, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }
  // get Vehicle
  getVehicle(id: Number) {
    return this._http.get(this.baseUrl + '/' + id, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }
  // delete Vehicle
  deleteVehicle(id: Number) {
    return this._http.delete(this.baseUrl + '/' + id, this.options)
      .catch(this.errorHandler);
  }
  // create Vehicle
  createVehicle(vehicle: Vehicles) {
    return this._http.post(this.baseUrl, JSON.stringify(vehicle), this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }
  // update Vehicle
  updateVehicle(vehicle: Vehicles) {
    console.log(vehicle);
    return this._http.put(this.baseUrl, JSON.stringify(vehicle), this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }
}
