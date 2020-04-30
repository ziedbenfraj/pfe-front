import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Measures } from 'src/app/models/measures/measures';
import { MeasuresService } from 'src/app/services/measures/measures.service';
import { SensorsService } from 'src/app/services/sensors/sensors.service';
import {MatTableDataSource} from '@angular/material';




@Component({
  selector: 'app-measures',
  templateUrl: './measures.component.html',
  styleUrls: ['./measures.component.scss']
})
export class MeasuresComponent implements OnInit {
  
  // modal
  modalRef: BsModalRef;
  public operation:string="";

  public measure:Measures;
  public measuresObj=new Measures();


  public measuresList:Measures[];
  



  // pagination
  public p: number = 1;

  // Sensor
  public sensorList:any;


  




  constructor(private _measureService:MeasuresService,
    private modalService: BsModalService,private _SensorService:SensorsService) { }

  ngOnInit() {
    
    this.getMeasures();
    this.getSensors();
  }

  // get Measures
  getMeasures(){
    this._measureService.getMeasures().subscribe((sensors)=>{
      this.measuresList=sensors;
    }, (error) => {
      console.log(error);
    })
  }

  // get sensors methods
  getSensors(){
    this._SensorService.getSensors().subscribe((sensors)=>{
      this.sensorList=sensors;
    }, (error) => {
      console.log(error);
    })
  };

  // new measures
  newMeasures(template: TemplateRef<any>) {
    this.measure=new Measures;
    this.operation="Add new Measure";
    this.modalRef = this.modalService.show(template);
  }
  // update measures
  updateMeasures(measuresObj,template: TemplateRef<any>) {
    this.measuresObj=measuresObj;
    this.operation="Edit measures";
    this.modalRef = this.modalService.show(template);
  }
  processForm(measuresObj) {
    if (this.measuresObj.id == undefined) {
      this._measureService.createMeasure(this.measuresObj).subscribe((measure) => {
        this.ngOnInit();
      }, (error) => {
        console.log(error);

      });
    } else {
      this._measureService.updateMeasure(this.measuresObj).subscribe((measure) => {
        this.ngOnInit();
      }, (error) => {
        console.log(error);
      });
    }
    this.closeForm();
  }
  // close form
  closeForm(){
    this.modalRef.hide();
  }

  // delete measures
  // confrim Delete MODAL
  openModal(confirmDelete: TemplateRef<any>) {
    this.modalRef = this.modalService.show(confirmDelete, {class: 'modal-sm'});
  }
  confirm(measuresObj) {
    this.measuresObj=measuresObj;
    this.deleteMeasure(measuresObj);
    this.modalRef.hide();
  }
 
  decline(): void {
    this.modalRef.hide();
  }
  deleteMeasure(measuresObj: Measures) {
    this._measureService.deleteMeasure(measuresObj.id).subscribe(() => {
      this.measuresList.splice(this.measuresList.indexOf(measuresObj), 1);
    }, (error) => {
      console.log(error);
    });
  }

}
