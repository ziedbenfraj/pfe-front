import { Component, OnInit, TemplateRef } from '@angular/core';
import { Companies } from 'src/app/models/companies/companies';
import { Vehicles } from 'src/app/models/vehicles/vehicles';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { VehiclesService } from 'src/app/services/vehicles/vehicles.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Tyre } from 'src/app/models/tyre/tyre';

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
  public tyres:Tyre[];

  modalRef: BsModalRef;

  public operation:string="";
  // constructor
  constructor(private _router: Router, private _authService: AuthenticationService,
    private _CompanieService: CompaniesService,
    private _VehiclesService: VehiclesService,private modalService: BsModalService) { }

  //get all departement
  ngOnInit() {
    this.OnGetAllVehicles();
    
  }


  //get all departements
  OnGetAllVehicles() {
    this._VehiclesService.getVehicles().subscribe((vehicle) => {
      this.vehicles = vehicle;
      console.log(this.vehicles);
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
  openModal(confirmDelete: TemplateRef<any>) {
    this.modalRef = this.modalService.show(confirmDelete, {class: 'modal-sm'});
  }
  confirm(vehicle) {
    this.deleteVehicle(vehicle);
    this.modalRef.hide();
  }
 
  decline(): void {
    this.modalRef.hide();
    this.ngOnInit();
  }
  deleteVehicle(vehicle: Vehicles) {
    this._VehiclesService.deleteVehicle(vehicle.id).subscribe(() => {
      this.vehicles.splice(this.vehicles.indexOf(vehicle), 1);
    }, (error) => {
      console.log(error);
    });
    this.closeForm();
  }

  //update
  updateVehicle(vehicle,template: TemplateRef<any>) {
    this.operation="Edit";
    this.vehicleObj=vehicle;
    this.onGetCompanies();
    this.modalRef = this.modalService.show(template);
  }
  newVehicle(template: TemplateRef<any>) {
    this.operation="Add";
    this.onGetCompanies();
    this.modalRef = this.modalService.show(template);
  }

  details(vehicle,vehicleDetail){
    console.log(vehicle);
    this.tyres=[];
    for (var i=0;i<vehicle.mountings.length;i++){
      if(vehicle.mountings[i].tyre !=null){
        this.tyres.push(vehicle.mountings[i].tyre);
      }
    }
    console.log(this.tyres);
    this.modalRef = this.modalService.show(vehicleDetail);
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



  closeForm(){
    this.modalRef.hide();
  }

  processForm(vehicleObj) {
    this.vehicleObj=vehicleObj;
    if (this.vehicleObj.id == undefined) {
      this._VehiclesService.createVehicle(this.vehicleObj).subscribe((vehicle) => {
        console.log(vehicle);
        this.ngOnInit();
      }, (error) => {
        console.log(error);

      })
    } else {
      this._VehiclesService.updateVehicle(this.vehicleObj).subscribe((vehicle) => {
        console.log(vehicle);
        this.ngOnInit();
      }, (error) => {
        console.log(error);
      })
    }
    this.closeForm();
  }

}

