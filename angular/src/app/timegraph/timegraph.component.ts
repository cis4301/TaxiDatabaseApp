import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { DataService } from '../services/data.service';
import { MessageService } from '../services/message.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import * as CanvasJS from './canvasjs-2.3.1/canvasjs.min';

@Component({
  selector: 'app-timegraph',
  templateUrl: './timegraph.component.html',
  styleUrls: ['./timegraph.component.css']
})
export class TimegraphComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  chart: any;
  chartdata: any;
  startZone: any;

  options = this.messageService.zoneinfo;
  optionSelected: any;
  selection = false;


  constructor(
    private validateService: ValidateService,
    private dataService: DataService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
      CanvasJS.addColorSet("googleMapcolors",
        [
          '#8E8C84',
          '#D6BF91',
          '#E1A56D',
          
        ]);
  		this.chart = new CanvasJS.Chart("chartContainer", {
  		animationEnabled: true,
  		exportEnabled: true,
      colorSet: "googleMapcolors",
  		title: {
  			text: "Zone Popularity"
  		},
      axisY: {
        title: "Trips per month"
      },
  		data: [{
  			type: "column",
  			dataPoints: [
          { label: "January", y: 1},
          { label: "February", y: 2},
          { label: "March", y: 3},
          { label: "April", y: 4},
          { label: "May", y: 5},
          { label: "June", y: 6},
          { label: "July", y: 7},
          { label: "August", y: 8},
          { label: "September", y: 9},
          { label: "October", y: 10},
          { label: "November", y: 11},
          { label: "December", y: 12}
        ]
  		}]
  	});

  	this.chart.render();


      }

  Back() {
    this.router.navigateByUrl('/');
  }

async getChart() {
      const delay = ms => new Promise(res => setTimeout(res, ms));

      var chartdata = this.chartdata;
      var zone = parseInt(this.optionSelected[0], 10);
      var chart = this.chart;
      var update = chart.options.data[0].dataPoints;
      var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

      if (zone > 0) {
        this.dataService.getPopularity(zone).subscribe((res:Response) => {
          chartdata = res;
        });
      }


      while(!chartdata) {
        await delay(1000);
        console.log("waited 1 second");
      }

      for (var i = 0; i < update.length; i ++) {
        console.log(chartdata[i].COUNT);
        console.log(chartdata[i].MONTH);
        update[i] = { label: months[i], y: chartdata[i].COUNT};
      }
      chart.options.data[0].dataPoints = update;
      chart.render();



      console.log(chartdata);



  }
  onOptionsSelected(event){
    console.log(event); //option value will be sent as event
  }

}
