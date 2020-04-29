import { Component, OnInit, TemplateRef } from '@angular/core';
import { Sensors } from 'src/app/models/sensors/sensors';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { SensorsService } from 'src/app/services/sensors/sensors.service';
import { TyreService } from 'src/app/services/tyre/tyre.service';
import { Tyre } from 'src/app/models/tyre/tyre';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Measures } from 'src/app/models/measures/measures';


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

  


  public detailMeasures:Measures[];


  modalRef: BsModalRef;
  public operation:string="";

  constructor(private _router: Router, private _authService: AuthenticationService,
    private _SensorService: SensorsService,private _tyreService:TyreService,private modalService: BsModalService) { }

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
  openModal(confirmDelete: TemplateRef<any>) {
    this.modalRef = this.modalService.show(confirmDelete, {class: 'modal-sm'});
  }
  confirm(sensor) {
    this.deleteSensor(sensor);
    this.modalRef.hide();
  }
  //delete
  deleteSensor(sensor: Sensors) {
    console.log(sensor);
    this._SensorService.deleteSensor(sensor.id).subscribe(() => {
      this.sensors.splice(this.sensors.indexOf(sensor), 1);
      this.ngOnInit();
      }, (error) => {
        console.log(error);
    }); 
  }
  // detail of sensor
  details(sensor,sensorDetail){
    this.sensor=sensor;
    if(sensor.measures!=null){
      this.detailMeasures=sensor.measures;
    }else{
      this.detailMeasures=null;
    }
    
    console.log(this.sensor);
    console.log(this.detailMeasures);
    this.modalRef = this.modalService.show(sensorDetail);
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

  decline(): void {
    this.modalRef.hide();
    this.ngOnInit();
  }


  //update
  updateSensor(sensor,template: TemplateRef<any>) {
    this.operation="Edit";
    this.sensorObj = sensor;
    this.modalRef = this.modalService.show(template);
  }
  newSensor(template: TemplateRef<any>) {
    this.operation="Add";
    this.modalRef = this.modalService.show(template);
  }


  processForm() {
    console.log(this.sensorObj);
    if (this.sensorObj.id == undefined) {
      this._SensorService.createSensor(this.sensorObj).subscribe((sensor) => {
        this.decline();
      }, (error) => {
        console.log(error);

      });
    } else {
      this._SensorService.updateSensor(this.sensorObj).subscribe((sensor) => {
        this.decline();
      }, (error) => {
        console.log(error);
      });


    }
  
  }






}
