import { Component, OnInit } from '@angular/core';
import { Sensors } from 'src/app/models/sensors/sensors';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { SensorsService } from 'src/app/services/sensors/sensors.service';
import { TyreService } from 'src/app/services/tyre/tyre.service';
import { Tyre } from 'src/app/models/tyre/tyre';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.scss']
})
export class SensorsComponent implements OnInit {

  public listUser: boolean = true;
  public addUpdate: boolean = false;
  public sensors:Sensors[];
  public sensor:Sensors;
  public sensorObj: Sensors = new Sensors();

  public x:Tyre;

  constructor(private _router: Router, private _authService: AuthenticationService,
    private _SensorService: SensorsService,private _tyreService:TyreService) { }

  ngOnInit() {
    this.OnGetAllSensors();
  }


  //get all sensors
  OnGetAllSensors() {
    this._SensorService.getSensors().subscribe((vehicle) => {
      this.sensors = vehicle;
    }, (error) => {
      console.log(error);
    });
  };

 

  //delete
  deleteSensor(sensor: Sensors) {
    console.log(sensor.tyre);
    if(sensor.tyre!=null){
      this.x=sensor.tyre;
      this.x.sensor=null;
      this._tyreService.updateTyre(sensor.tyre).subscribe(() => {
        console.log("y rab setrek");
        this.ngOnInit();
      }, (error) => {
        console.log(error);
      });
    }
    
    this._SensorService.deleteSensor(sensor.id).subscribe(() => {
      this.sensors.splice(this.sensors.indexOf(sensor), 1);
    }, (error) => {
      console.log(error);
    });
    this.ngOnInit();
  }

  //update
  updateSensor(sensor) {
    this.sensorObj = sensor;
    this.listUser = false;
    this.addUpdate = true;
  }
  newSensor() {
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
    if (this.sensorObj.id == undefined) {
      console.log("create  eyy");
      console.log(this.sensorObj);
      this._SensorService.createSensor(this.sensorObj).subscribe((sensor) => {
        console.log(sensor);
        this.ngOnInit();
      }, (error) => {
        console.log(error);

      });
    } else {
      this._SensorService.updateSensor(this.sensorObj).subscribe((sensor) => {
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
