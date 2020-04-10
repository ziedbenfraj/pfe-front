import { Component, OnInit, TemplateRef } from '@angular/core';
import { Chart } from 'chart.js';
import { SensorsService } from 'src/app/services/sensors/sensors.service';
import { Sensors } from 'src/app/models/sensors/sensors';
import { Measures } from 'src/app/models/measures/measures';
import { forEach } from '@angular/router/src/utils/collection';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TyreService } from 'src/app/services/tyre/tyre.service';
import { VehiclesService } from 'src/app/services/vehicles/vehicles.service';
import { MeasuresService } from 'src/app/services/measures/measures.service';
import { Router } from '@angular/router';
import { MaxMeasures } from 'src/app/models/maxMeasures/max-measures';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  ngOnInit() {
    // chart
    new Chart('chart-line',  {
      type: 'line',
      data: this.chart1.data,
      options: this.chart1.options
    });
    this.getTyres();
    this.getVehicles();
    this.getMeasures();
    console.log("heyyy");
    this.myFunc();
    
  }
  // modal
  modalRef: BsModalRef;
  public operation:string="";

  public measure:Measures;
  public measuresObj=new Measures();

  
  // for chart
  public measureName=["sensor1", "sensor 2", "sensor 3", "sensor 4", "sensor 5", "sensor 6"];
  public measureTemperature=[];
  public measurePressure=[];

  // number of sensors
  public numberSensors:number;
  public numberTyres:number;
  public numberVehicles:number;
  public numberMeasures:number;

  // Measures
  public measuresList:any;
  // Sensor
  public sensorList:any;
  // aux
  //public aux=new MaxMeasures();
  public myArray: Measures;
  // max temp ,max pressure
  public Temperature;
  public Pressure;

  constructor(private _SensorService:SensorsService,private _tyreService:TyreService,
              private _vehicleService:VehiclesService,private _measureService:MeasuresService,
              private modalService: BsModalService) { }
  
  
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
      console.log('indice 111111 !');
      this._measureService.createMeasure(this.measuresObj).subscribe((measure) => {
        console.log(measure);
        this.ngOnInit();
      }, (error) => {
        console.log(error);

      });
    } else {
      this._measureService.updateMeasure(this.measuresObj).subscribe((measure) => {
        console.log(measure);
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
    this.deleteDepartement(measuresObj);
    this.modalRef.hide();
  }
 
  decline(): void {
    this.modalRef.hide();
  }
  deleteDepartement(measuresObj: Measures) {
    this._measureService.deleteMeasure(measuresObj.id).subscribe(() => {
      this.measuresList.splice(this.measuresList.indexOf(measuresObj), 1);
    }, (error) => {
      console.log(error);
    });
  }

  // nratb el temp wel pression
  myFunc(){
    this._SensorService.getSensors().subscribe((sensors)=>{
      this.sensorList=sensors;
      this.numberSensors=this.sensorList.length;
      //list of object contain sensor details with max teperature and pressure
      var maxMeasures:MaxMeasures[]=[];
      this.sensorList.forEach(element => {
        //object contain sensor details with max teperature and pressure
        var aux=new MaxMeasures();
        if(Object.keys(element.measures).length!=0){
          aux.id=element.id;
          aux.name=element.name;
          // meassures
          this.myArray=element.measures;
          var size = Object.keys(this.myArray).length;
          this.Temperature=0
          this.Pressure=0;
          for(var i=0;i<size;i++){
            this.Temperature+=this.myArray[i].temperature;
            this.Pressure+=this.myArray[i].pressure;
          };
          aux.maxTemperature=this.Temperature/size;
          aux.maxPressure=this.Pressure/size;
          maxMeasures.push(aux);
        };      
      });
      // here 
      this.measureTemperature.length=0;
      maxMeasures.forEach(value => {
        this.measureTemperature.push(value.maxTemperature);
        this.measurePressure.push(value.maxPressure);
      });
        // this.measureName.reverse();
        // this.measureTemperature;
        // this.measurePressure;

      console.log(this.measureTemperature);
      console.log(this.measurePressure);
      
    }, (error) => {
      console.log(error);
    });
    
    
  }
  // get Measures
  getMeasures(){
    this._measureService.getMeasures().subscribe((sensors)=>{
      this.measuresList=sensors;
      this.numberMeasures=this.measuresList.length;
    }, (error) => {
      console.log(error);
    })
  }
  // get sensors methods
  getSensors(){
    this._SensorService.getSensors().subscribe((sensors)=>{
      this.sensorList=sensors;
      this.numberSensors=this.sensorList.length;
    }, (error) => {
      console.log(error);
    })
  };
  // get tyres methods
  getTyres(){
    this._tyreService.getTyres().subscribe((tyre)=>{
      this.numberTyres=tyre.length;
    }, (error) => {
      console.log(error);
    })
  };

  // get tyres methods
  getVehicles(){
    this._vehicleService.getVehicles().subscribe((vehicle)=>{
      this.numberVehicles=vehicle.length;
    }, (error) => {
      console.log(error);
    })
  };

  

  chart1 = {
    data :{
      labels: this.measureName,
      datasets: [{
          label: 'temperature',
          data: this.measureTemperature,
          backgroundColor: 'transparent',
          borderColor: '#5b6582',
          borderWidth: 2
      },
      {
        label: 'pressure',
        data: this.measurePressure,
        backgroundColor: 'transparent',
        borderColor: '#36a2eb',
        borderWidth: 2
      }
    ]
    },
    options:{
      scales: {
          yAxes: [{
            ticks: {
                fontColor: 'rgba(0,0,0,.6)',
                fontStyle: 'bold',
                beginAtZero: true,
                maxTicksLimit: 8,
                padding: 10
            }          
        }]       
      },
      responsive: true,
      legend: {          
        position:'bottom',
        display:false
      },
    }
  };

  

}