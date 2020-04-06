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


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  // number of sensors
  public numberSensors:number=99;
  public numberTyres:number;
  public numberVehicles:number;
  public numberMeasures:number;

  // Measures
  public measuresList:Measures[];

  constructor(private _SensorService:SensorsService,private _tyreService:TyreService,
              private _vehicleService:VehiclesService,private _measureService:MeasuresService) { }
  
  
  // get Measures
  getMeasures(){
    this._measureService.getMeasures().subscribe((sensors)=>{
      this.measuresList=sensors;
      this.numberMeasures=this.measuresList.length;
      console.log(this.measuresList);
    }, (error) => {
      console.log(error);
    })
  }
  // get sensors methods
  getSensors(){
    this._SensorService.getSensors().subscribe((sensors)=>{
      this.numberSensors=sensors.length;
      console.log(this.numberSensors);
    }, (error) => {
      console.log(error);
    })
  };
  // get tyres methods
  getTyres(){
    this._tyreService.getTyres().subscribe((tyre)=>{
      this.numberTyres=tyre.length;
      console.log(this.numberTyres);
    }, (error) => {
      console.log(error);
    })
  };

  // get tyres methods
  getVehicles(){
    this._vehicleService.getVehicles().subscribe((vehicle)=>{
      this.numberVehicles=vehicle.length;
      console.log(this.numberVehicles);
    }, (error) => {
      console.log(error);
    })
  };

  ngOnInit() {
    this.getSensors();
    this.getTyres();
    this.getVehicles();
    this.getMeasures();
    // chart
    new Chart('chart-line',  {
          type: 'line',
          data: this.chart1.data,
          options: this.chart1.options
        });


  }

  chart1 = {
    data :{
      labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      datasets: [{
          label: 'Premium',
          data: [50, 80, 60, 120, 80, 100, 60],
          backgroundColor: 'transparent',
          borderColor: '#5b6582',
          borderWidth: 2
      },
      {
        label: 'Free',
        data: [100, 60, 80, 50, 140, 60, 100],
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