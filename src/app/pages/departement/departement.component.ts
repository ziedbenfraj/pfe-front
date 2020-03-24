import { Component, OnInit } from '@angular/core';
import { DepartementService } from 'src/app/services/departements/departement.service';
import { Router } from '@angular/router';
import { Departement } from 'src/app/models/departements/departement';
import { AuthenticationService } from 'src/app/services/authentication.service';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.scss']
})
export class DepartementComponent implements OnInit {
  public listUser:boolean=true;
  public addUpdate:boolean=false;
  public departements: Departement[];
  public departement: Departement;
  // constructor
  constructor(private _depService: DepartementService, private _router: Router,
    private _authService: AuthenticationService) { }



  //get all departement
  ngOnInit() {
    this.OnGetAllDepartements()
  }

  //get all departements
  OnGetAllDepartements() {
    this._depService.getDepartements().subscribe((departement) => {
      this.departements = departement;
    }, (error) => {
      console.log(error);
    });
  }

  //delete
  deleteDepartement(departement: Departement) {
    this._depService.deleteDepartement(departement.id).subscribe(() => {
      this.departements.splice(this.departements.indexOf(departement), 1);
    }, (error) => {
      console.log(error);
    });
  }

  //update
  updateDepartement(departement) {
   // localStorage.setItem("update",departement)
    // this._depService.setter(departement);
    this.departement=departement;
    this.listUser=false;
    this.addUpdate=true;
  }
  newDepartement() {
    this.departement=new Departement;
    this.listUser=false;
    this.addUpdate=true;
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





  processForm(departement) {
    if (this.departement.id == undefined) {
      console.log('indice 111111 !');
      this._depService.createDepartement(this.departement).subscribe((departement) => {
        console.log(departement);
        this.ngOnInit();
      }, (error) => {
        console.log(error);

      });
    } else {
      console.log('indice 2222 !');
      this._depService.updateDepartement(this.departement).subscribe((departement) => {
        console.log(departement);
        this.ngOnInit();
      }, (error) => {
        console.log(error);
      });
    }
    this.listUser=true;
    this.addUpdate=false;
  }





}
