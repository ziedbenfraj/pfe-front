import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import {Http,Response,Headers,RequestOptions} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/observable/throw';
import { Role } from 'src/app/models/roles/role';
import { HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';


@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(private _http:Http,private _authService:AuthenticationService) { }
  private baseUrl:string="http://localhost:8080/role";
  // private headers=new Headers({'content-type':'application/json'});
  private header=new Headers({"Authorization":'Bearer '+this._authService.jwt})
  private options=new RequestOptions({headers:this.header});

  private role=new Role;

  

  //errorHandler
  errorHandler(error:Response){
    return Observable.throw(error||"server Error");
    
  }

  //get all roles
  getRoles(){
    return this._http.get(this.baseUrl,this.options)
    .map((response: Response)=>response.json())
    .catch(this.errorHandler);
  }

  //update role
  updateRole(role: Role) {
    console.log("heyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
    return this._http.put(this.baseUrl, JSON.stringify(role), this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

}
