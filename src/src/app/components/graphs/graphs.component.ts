import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {
  id: Number;
  tripdata: any;
  distance: any;
  amount: any;
  pickup: any;
  dropoff: any;

  constructor(
    private validateService: ValidateService,
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit() { }

  onGraphSubmit() {
    var trip = {
      id: this.id
    }
    console.log(this.id);


  if(!this.validateService.validateEmpty(trip)){
    console.log('Please input an ID value');
    return false;
  }


  this.dataService.getTrip(this.id).subscribe((res:Response) => {
    this.tripdata = res.json();
    this.id = this.tripdata.TRIPID;
    this.distance = this.tripdata.TRIP_DISTANCE;
    this.amount = this.tripdata.TOTAL_AMOUNT;
    this.pickup = this.tripdata.PICKUP_DATETIME;
    this.dropoff = this.tripdata.DROPOFF_DATETIME;
    console.log(this.tripdata);
    console.log(this.distance);
  });

}
}
