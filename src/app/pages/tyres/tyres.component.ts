import { Component, OnInit } from '@angular/core';
import { Tyre } from 'src/app/models/tyre/tyre';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TyreService } from 'src/app/services/tyre/tyre.service';

@Component({
  selector: 'app-tyres',
  templateUrl: './tyres.component.html',
  styleUrls: ['./tyres.component.scss']
})
export class TyresComponent implements OnInit {

  public listUser: boolean = true;
  public addUpdate: boolean = false;
  public tyres: Tyre[];
  public tyreObj: Tyre = new Tyre();

  constructor(private _router: Router, private _authService: AuthenticationService,
    private _tyreService: TyreService) { }

  ngOnInit() {
    this.OnGetAllTyres();
  }


  //get all sensors
  OnGetAllTyres() {
    this._tyreService.getTyres().subscribe((tyre) => {
      this.tyres = tyre;
    }, (error) => {
      console.log(error);
    });
  };

  //delete
  deleteTyre(tyre: Tyre) {
    this._tyreService.deleteTyre(tyre.id).subscribe(() => {
      this.tyres.splice(this.tyres.indexOf(tyre), 1);
    }, (error) => {
      console.log(error);
    });
  }

  //update
  updateTyre(tyre) {
    // localStorage.setItem("update",departement)
    // this._depService.setter(departement);
    this.tyreObj = tyre;
    this.listUser = false;
    this.addUpdate = true;
  }
  newTyre() {
    this.listUser = false;
    this.addUpdate = true;
  }



  //return true if exist role 
  isAutheticated() {
    return this._authService.isAutheticated();
  }

  //verify admin or not
  isAdmin() {
    return this._authService.role == "ADMIN";

  }

  isUser() {
    return this._authService.role == "USER";
  }

  userName() {
    return this._authService.username;
  }





  processForm() {
    //user.activated=true;
    if (this.tyreObj.id == undefined) {
      console.log("create  eyy");
      console.log(this.tyreObj);
      this._tyreService.createTyre(this.tyreObj).subscribe((sensor) => {
        console.log(sensor);
        this.ngOnInit();
      }, (error) => {
        console.log(error);

      });
    } else {
      this._tyreService.updateTyre(this.tyreObj).subscribe((sensor) => {
        console.log(sensor);
        this.ngOnInit();
      }, (error) => {
        console.log(error);
      });


    }

    this.listUser = true;
    this.addUpdate = false;
    this.ngOnInit();
  }

}
