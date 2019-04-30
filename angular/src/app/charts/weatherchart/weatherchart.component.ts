import { ValidateService } from '../../services/validate.service';
import { DataService } from '../../services/data.service';
import { MessageService } from '../../services/message.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChartDataSets, ChartOptions, Chart } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-weatherchart',
  templateUrl: './weatherchart.component.html',
  styleUrls: ['./weatherchart.component.css']
})
export class WeatherchartComponent implements OnInit {
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
        text: 'Average Fare',
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
    this.chart = new Chart(this.chartReference.nativeElement, {
      type: 'line',
      data: {
        labels: this.chartLabels,
        datasets: this.chartData
      },
      options: this.chartOptions
    });
  }

    async TempResults() {
        this.el.nativeElement.style.display='block';
        const delay = ms => new Promise(res => setTimeout(res, ms));

        // retrieve data from the server
       this.dataService.getTempResults().subscribe((res:Response) => {
          this.chartdata = res;
        });

        while(!this.chartdata) {
          await delay(1000);
          console.log("waited 1 second");
        }
        this.el.nativeElement.style.display='none';
        // restructure chart data to 1-dimensional array
        var newdata = this.chartdata.map(function (data) {
          return (data.TRIPTIME / 60);
        });
        var newlabels = this.chartdata.map(function (data) {
          return data.TEMPERATURE;
        })

        this.chartData2 = [
          { data: newdata,
            label: "Average Time (min / mile)",
            borderColor: '#00AEFF',
            fill: false}
          ];

        this.context = (<HTMLCanvasElement> this.chartReference.nativeElement).getContext('2d');

        this.chartOptions = {
            responsive: true,
            title: {
              display: true,
              text: 'Average Fare',
              fontSize: 36
            },
            scales: {
              xAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Temperature (Fahrenheit)',
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

    async Windspeed() {
      this.el.nativeElement.style.display='block';
      const delay = ms => new Promise(res => setTimeout(res, ms));

      // retrieve data from the server
     this.dataService.getWindspeed().subscribe((res:Response) => {
        this.chartdata = res;
      });

      while(!this.chartdata) {
        await delay(1000);
        console.log("waited 1 second");
      }
      this.el.nativeElement.style.display='none';
      // restructure chart data to 1-dimensional array
      var newdata = this.chartdata.map(function (data) {
        return (data.TRIPTIME / 60);
    });
      var newlabels = this.chartdata.map(function (data) {
        return data.WINDSPEED;
      })

      this.chartData2 = [
        { data: newdata,
          label: "Average Time (minutes / mile)",
          borderColor: '#00AEFF',
          fill: false}
        ];

      this.context = (<HTMLCanvasElement> this.chartReference.nativeElement).getContext('2d');

      this.chartOptions = {
          responsive: true,
          title: {
            display: true,
            text: 'Average Fare',
            fontSize: 36
          },
          scales: {
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Windspeed in miles per hour',
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

    async Condition() {
        this.el.nativeElement.style.display='block';
        const delay = ms => new Promise(res => setTimeout(res, ms));

        // retrieve data from the server
       this.dataService.getCondition().subscribe((res:Response) => {
          this.chartdata = res;
        });

        while(!this.chartdata) {
          await delay(1000);
          console.log("waited 1 second");
        }
        this.el.nativeElement.style.display='none';
        // restructure chart data to 1-dimensional array
        var newdata = this.chartdata.map(function (data) {
          return (data.TRIPTIME / 60);
        });
        var newlabels = this.chartdata.map(function (data) {
          return data.CONDITION;
        })

        this.chartData2 = [
          { data: newdata,
            label: "Average Time (min / mile)",
            borderColor: '#00AEFF',
            fill: false}
          ];

        this.context = (<HTMLCanvasElement> this.chartReference.nativeElement).getContext('2d');

        this.chartOptions = {
            responsive: true,
            title: {
              display: true,
              text: 'Average Fare',
              fontSize: 36
            },
            scales: {
              xAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Weather Condition',
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
