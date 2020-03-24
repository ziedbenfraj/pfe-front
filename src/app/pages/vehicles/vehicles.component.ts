import { Component, OnInit } from '@angular/core';
import { Companies } from 'src/app/models/companies/companies';
import { Vehicles } from 'src/app/models/vehicles/vehicles';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { VehiclesService } from 'src/app/services/vehicles/vehicles.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {

  public listUser: boolean = true;
  public addUpdate: boolean = false;
  public vehicles: Vehicles[];
  public vehicleObj: Vehicles=new Vehicles();
  // companies
  public companies: Companies[];

  // constructor
  constructor(private _router: Router, private _authService: AuthenticationService,
    private _CompanieService: CompaniesService,
    private _VehiclesService: VehiclesService) { }

  //get all departement
  ngOnInit() {
    this.OnGetAllVehicles();
  }


  //get all departements
  OnGetAllVehicles() {
    this._VehiclesService.getVehicles().subscribe((vehicle) => {
      this.vehicles = vehicle;
    }, (error) => {
      console.log(error);
    });
  };

  // get companies
  onGetCompanies() {
    this._CompanieService.getCompanies().subscribe((companie) => {
      this.companies = companie;
    }, (error) => {
      console.log(error);
    });
  };



  //delete
  deleteVehicle(vehicle: Vehicles) {
    this._VehiclesService.deleteVehicle(vehicle.id).subscribe(() => {
      this.vehicles.splice(this.vehicles.indexOf(vehicle), 1);
    }, (error) => {
      console.log(error);
    });
  }

  //update
  updateVehicle(vehicle) {
    // localStorage.setItem("update",departement)
    // this._depService.setter(departement);
    this.vehicleObj = vehicle;
    this.listUser = false;
    this.addUpdate = true;
    this.onGetCompanies();
  }
  newVehicle() {
    this.listUser = false;
    this.addUpdate = true;
    this.onGetCompanies();
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
    if (this.vehicleObj.id == undefined) {
      console.log("create  eyy");
      console.log(this.vehicleObj);
      this._VehiclesService.createVehicle(this.vehicleObj).subscribe((vehicle) => {
        console.log(vehicle);
        this.ngOnInit();
      }, (error) => {
        console.log(error);

      });
    } else {
      this._VehiclesService.updateVehicle(this.vehicleObj).subscribe((vehicle) => {
        console.log(vehicle);
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
