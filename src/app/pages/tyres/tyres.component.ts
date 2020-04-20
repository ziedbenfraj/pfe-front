import { Component, OnInit, TemplateRef } from '@angular/core';
import { Tyre } from 'src/app/models/tyre/tyre';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TyreService } from 'src/app/services/tyre/tyre.service';
import { SensorsService } from 'src/app/services/sensors/sensors.service';
import { Sensors } from 'src/app/models/sensors/sensors';
import { Vehicles } from 'src/app/models/vehicles/vehicles';
import { VehiclesService } from 'src/app/services/vehicles/vehicles.service';
import { Mounting } from 'src/app/models/mounting/mounting';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MountingService } from 'src/app/services/mountings/mounting.service';

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

  public sensors=new Array();
  public vehicles:Vehicles[];

  public yyy:Mounting=new Mounting();
  public zied:Vehicles=new Vehicles();

  modalRef: BsModalRef;
  public operation:string="";


  constructor(private _router: Router, private _authService: AuthenticationService,
    private _tyreService: TyreService,private _sensorService: SensorsService,private modalService: BsModalService,
    private _vehicleService:VehiclesService,private _mountingService:MountingService) { }

  ngOnInit() {
    this.OnGetAllTyres();
  }

  //get vehicle
  onGetVehicle(){
    this._vehicleService.getVehicles().subscribe((vehicle)=>{
      this.vehicles=vehicle;
    },(error)=>{
      console.log(error);
    })
  }

   // get sensor
   onGetSensor() {
    this._sensorService.getSensors().subscribe((sensor) => {
      sensor.forEach(item => {
        if(item.tyre==null) this.sensors.push(item);
      });
      
    }, (error) => {
      console.log(error);
    });
  };

  //get all sensors
  OnGetAllTyres() {
    this._tyreService.getTyres().subscribe((tyre) => {
      this.tyres = tyre;
      console.log(this.tyres);
    }, (error) => {
      console.log(error);
    });
  };

  //delete
  deleteTyre(tyre: Tyre) {
    this._tyreService.deleteTyre(tyre.id).subscribe(() => {
      this._mountingService.deleteMounting(tyre.mounting.id);
      this.tyres.splice(this.tyres.indexOf(tyre), 1);
    }, (error) => {
      console.log(error);
    });
  }

  //update
  updateTyre(tyre,template: TemplateRef<any>) {
    this.operation="Edit";
    this.onGetSensor();
    this.onGetVehicle();
    this.tyreObj = tyre;

    this.yyy=this.tyreObj.mounting;
    this.zied=this.yyy.vehicle;

    this.modalRef = this.modalService.show(template);
  }
  newTyre(template: TemplateRef<any>) {
    this.operation="Add";
    
    console.log(this.zied);
    this.onGetSensor();
    this.onGetVehicle();
    this.modalRef = this.modalService.show(template);
  }

  //delete
  openModal(confirmDelete: TemplateRef<any>) {
    this.modalRef = this.modalService.show(confirmDelete, {class: 'modal-sm'});
  }
  confirm(tyre) {
    this.deleteTyre(tyre);
    this.modalRef.hide();
  }
 
  decline(): void {
    this.modalRef.hide();
    this.ngOnInit();
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

  processForm() {
    console.log(this.zied);
    // this.yyy.vehicle=this.zied;
    // // this.yyy.tyre=tyreObj;
    // this.tyreObj.mounting=this.yyy;
    // if (this.tyreObj.id == undefined) {
    //   this._tyreService.createTyre(this.tyreObj).subscribe((sensor) => {
    //     this.ngOnInit();
    //   }, (error) => {
    //     console.log(error);

    //   });
    // } else {
    //   console.log(this.tyreObj);
    //   this._tyreService.updateTyre(this.tyreObj).subscribe((tyre) => {
    //     this.ngOnInit();
    //   }, (error) => {
    //     console.log(error);
    //   });
    // }
    this.closeForm();
    
  }

}
