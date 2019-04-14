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

  constructor(
    private validateService: ValidateService,
    private dataService: DataService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
  		let chart = new CanvasJS.Chart("chartContainer", {
  		animationEnabled: true,
  		exportEnabled: true,
  		title: {
  			text: "Zone popularity by Month"
  		},
  		data: [{
  			type: "column",
  			dataPoints: [
  				{ y: 71, label: "January" },
  				{ y: 55, label: "February" },
  				{ y: 50, label: "March" },
  				{ y: 65, label: "April" },
  				{ y: 95, label: "May" },
  				{ y: 68, label: "June" },
  				{ y: 28, label: "July" },
  				{ y: 34, label: "August" },
  				{ y: 14, label: "September" },
          { y: 28, label: "October" },
          { y: 34, label: "November" },
          { y: 14, label: "December" }

  			]
  		}]
  	});

  	chart.render();
      }

  Back() {
    this.router.navigateByUrl('/');
  }


}
