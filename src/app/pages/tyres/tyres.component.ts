import { Component, OnInit } from '@angular/core';
import { Tyre } from 'src/app/models/tyre/tyre';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TyreService } from 'src/app/services/tyre/tyre.service';
import { SensorsService } from 'src/app/services/sensors/sensors.service';
import { Sensors } from 'src/app/models/sensors/sensors';
import { Vehicles } from 'src/app/models/vehicles/vehicles';
import { VehiclesService } from 'src/app/services/vehicles/vehicles.service';
import { Mounting } from 'src/app/models/mounting/mounting';

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


  constructor(private _router: Router, private _authService: AuthenticationService,
    private _tyreService: TyreService,private _sensorService: SensorsService,
    private _vehicleService:VehiclesService) { }

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
    this.onGetSensor();
    this.onGetVehicle();
    this.tyreObj = tyre;
    this.zied=this.tyreObj.mounting.vehicle;
    console.log(this.zied);
    // this.listUser = false;
    // this.addUpdate = true;
  }
  newTyre() {
    this.onGetSensor();
    this.onGetVehicle();
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
    this.yyy.vehicle=this.zied;
    this.tyreObj.mounting=this.yyy;
    if (this.tyreObj.id == undefined) {
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
    this.ngOnInit();
    this.listUser = true;
    this.addUpdate = false;
    
  }

}
