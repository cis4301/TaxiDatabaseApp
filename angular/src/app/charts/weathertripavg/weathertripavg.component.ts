import { ValidateService } from '../../services/validate.service';
import { DataService } from '../../services/data.service';
import { MessageService } from '../../services/message.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChartDataSets, ChartOptions, Chart } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-weathertripavg',
  templateUrl: './Weathertripavg.component.html',
  styleUrls: ['./Weathertripavg.component.css']
})
export class WeathertripavgComponent implements OnInit {
  @ViewChild('lineChart') private chartReference;
  @ViewChild('overlay') el:ElementRef;
  @ViewChild('canvasChart') canvasChart: ElementRef;
  public context: CanvasRenderingContext2D;
  chartdata: any;
  chart: any;


  chartOptions = {
      responsive: true,
      title: {
        display: true,
        text: 'Average Time (minutes / mile)',
        fontSize: 36
      },
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'X Axis',
            fontSize: 16,
            fontFamily: 'Helvetica'
          }
        }]
      }
    };

  chartData = [
    { data: [10000, 600, 260, 700, 260, 700, 330, 600, 260, 700, 260, 700], label: 'Zone 1', borderColor: '#00AEFF',
      fill: false},
    { data: [120, 455, 100, 340, 100, 340, 120, 455, 100, 340, 100, 340], label: 'Zone 2', borderColor: '#ff0000',
      fill: false },
    { data: [45, 67, 800, 500, 800, 500, 45, 67, 800, 500, 800, 500], label: 'Zone 3', borderColor: '#0000FF',
      fill: false }
  ];

  chartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  chartData2: any;


  constructor(
    private validateService: ValidateService,
    private dataService: DataService,
    private messageService: MessageService,
    private router: Router
  ) {}


  ngOnInit() {
    this.Results()
  }

    async Results() {
        this.el.nativeElement.style.display='block';
        const delay = ms => new Promise(res => setTimeout(res, ms));

        // retrieve data from the server
       this.dataService.getweathertripavg().subscribe((res:Response) => {
          this.chartdata = res;
        });

        while(!this.chartdata) {
          await delay(1000);
          console.log("waited 1 second");
        }
        this.el.nativeElement.style.display='none';
        // restructure chart data to 1-dimensional array
        var snowdata = this.chartdata.map(function (data) {
          return (data.SNOW*50);
        });
		var cleardata = this.chartdata.map(function (data) {
          return (data.CLEAR*50);
        });
		var raindata = this.chartdata.map(function (data) {
          return (data.RAIN*50);
        });
        var newlabels = this.chartdata.map(function (data) {
          return (data.HOUR);
        })

        this.chartData2 = [
        { data: cleardata,
          label: "Clear",
          borderColor: '#00FF00',
          fill: false} ,
		{ data: raindata,
          label: "Rain",
          borderColor: '#0000FF',
          fill: false} ,
		{ data: snowdata,
          label: "Snow",
          borderColor: '#FF0000',
          fill: false}
          ];

        this.context = (<HTMLCanvasElement> this.chartReference.nativeElement).getContext('2d');

        this.chartOptions = {
            responsive: true,
            title: {
              display: true,
              text: 'Taxi Rides/Hour',
              fontSize: 36
            },
            scales: {
              xAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Hour',
                  fontSize: 20,
                  fontFamily: 'Helvetica'
                }
              }]
            }
          };

        this.chart = new Chart(this.context, {
          type: 'line',
          data: {
            labels: newlabels, // your labels array
            datasets: this.chartData2
          },
          options: this.chartOptions
        });
        this.chartdata = null;
        this.chart.update();


    }

}
