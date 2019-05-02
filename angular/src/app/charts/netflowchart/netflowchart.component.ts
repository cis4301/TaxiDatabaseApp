import { ValidateService } from '../../services/validate.service';
import { DataService } from '../../services/data.service';
import { MessageService } from '../../services/message.service';
import { Router, Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChartDataSets, ChartOptions, Chart } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-netflowchart',
  templateUrl: './netflowchart.component.html',
  styleUrls: ['./netflowchart.component.css']
})
export class NetflowchartComponent implements OnInit {

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
          text: 'Hourly Average Net Flow',
          fontSize: 36
        },
		scales: {
		  yAxes: [{
			ticks: {
			  beginAtZero: true
			}
		  }]
		},
		legend:{display: true,labels:{fontSize:24}}
      };



    constructor(
      private validateService: ValidateService,
      private dataService: DataService,
      private messageService: MessageService,
      private router: Router,
	  private route: ActivatedRoute
    ) {}

    ngOnInit() {
      this.route.queryParams.subscribe(params => {
		  console.log(params);
		  
          this.zone = params.zone;
          console.log(this.zone); // popular
      });
	  
	 
	  this.onZoneSubmit();
    }


    async onZoneSubmit() {

        var zonenumber = {
          zone: this.zone
        }
        console.log(this.zone);

        const delay = ms => new Promise(res => setTimeout(res, ms));

       this.dataService.getnetflowchart(this.zone).subscribe((res:Response) => {
          this.chartdata = res;
        });

        while(!this.chartdata) {
          await delay(1000);
          console.log("waited 1 second");
        }

        this.zonedata = this.messageService.getZoneInfo(this.zone);
        // restructure chart data to 1-dimensional array
        var newdata = this.chartdata.map(function (data) {
          return data.NETFLOW*50
      });
	  
	  
        var newlabels = this.chartdata.map(function (data) {
          return (data.HOUR);
        })

        this.olddata = newdata;
        this.oldzonedata = this.zonedata;

        console.log(newdata);
        this.chartData2 = [
          { data: newdata,
            label: this.zonedata[2] + ", " + this.zonedata[1],
            borderColor: '#00AEFF',
			fontSize: 24,
            fill: false}
          ];
        this.context = (<HTMLCanvasElement> this.chartReference.nativeElement).getContext('2d');

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
