import { ValidateService } from '../../services/validate.service';
import { DataService } from '../../services/data.service';
import { MessageService } from '../../services/message.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChartDataSets, ChartOptions, Chart } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-testchart',
  templateUrl: './testchart.component.html',
  styleUrls: ['./testchart.component.css']
})
export class TestchartComponent implements OnInit {

    @ViewChild('lineChart') private chartReference;
    @ViewChild('canvasChart') canvasChart: ElementRef;
    public context: CanvasRenderingContext2D;
    chartdata: any;
    chart: any;
    zonedata: any;
    clicked = false;
    zone: Number;
    olddata: any;
    oldzonedata: any;

    chartOptions = {
        responsive: true,
        title: {
          display: true,
          text: 'Popularity by Month',
          fontSize: 36
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


    async onZoneSubmit() {

        var zonenumber = {
          zone: this.zone
        }
        console.log(this.zone);

        const delay = ms => new Promise(res => setTimeout(res, ms));

       this.dataService.getPopularity(this.zone).subscribe((res:Response) => {
          this.chartdata = res;
        });

        while(!this.chartdata) {
          await delay(1000);
          console.log("waited 1 second");
        }

        this.zonedata = this.messageService.getZoneInfo(this.zone);
        // restructure chart data to 1-dimensional array
        var newdata = this.chartdata.map(function (data) {
          return data.COUNT
      });

        this.olddata = newdata;
        this.oldzonedata = this.zonedata;

        console.log(newdata);
        this.chartData2 = [
          { data: newdata,
            label: this.zonedata[2] + ", " + this.zonedata[1],
            borderColor: '#00AEFF',
            fill: false}
          ];
        this.context = (<HTMLCanvasElement> this.chartReference.nativeElement).getContext('2d');

        this.chart = new Chart(this.context, {
          type: 'line',
          data: {
            labels: this.chartLabels, // your labels array
            datasets: this.chartData2
          },
          options: this.chartOptions
        });
        this.chartdata = null;
        this.chart.update();


      }

    async onZoneCompare() {

              var zonenumber = {
                zone: this.zone
              }
              console.log(this.zone);

              const delay = ms => new Promise(res => setTimeout(res, ms));

             this.dataService.getPopularity(this.zone).subscribe((res:Response) => {
                this.chartdata = res;
              });

              while(!this.chartdata) {
                await delay(1000);
                console.log("waited 1 second");
              }

              this.zonedata = this.messageService.getZoneInfo(this.zone);
              // restructure chart data to 1-dimensional array
              var newdata = this.chartdata.map(function (data) {
                return data.COUNT
            });


            this.chartData2 = [
              { data: this.olddata,
                label: this.oldzonedata[2] + ", " + this.oldzonedata[1],
                borderColor: '#00AEFF',
                fill: false},
                {
                  data: newdata,
                    label: this.zonedata[2] + ", " + this.zonedata[1],
                    borderColor: '#FF0000',
                    fill: false
                }
              ];
            this.context = (<HTMLCanvasElement> this.chartReference.nativeElement).getContext('2d');

            this.chart = new Chart(this.context, {
              type: 'line',
              data: {
                labels: this.chartLabels, // your labels array
                datasets: this.chartData2
              },
              options: this.chartOptions
            });


        this.chart.update();
    }
}
