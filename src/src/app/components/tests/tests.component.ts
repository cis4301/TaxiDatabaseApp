import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})

export class TestsComponent implements OnInit {
  id: Number;
  zone: Number;
  tripdata: any;
  distance: any;
  amount: any;
  pickup: any;
  dropoff: any;

  zonedata: any;
  location: any;
  borough: any;
  zonename: any;
  servicezone: any;

  constructor(
    private validateService: ValidateService,
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit() { }


  onTestSubmit() {
    var trip = {
      id: this.id
    }
    console.log(this.id);

    if(!this.validateService.validateEmpty(trip)){
      console.log('Please input an ID value');
      return false;
    }

    if(!this.validateService.validatePositive(trip)){
      console.log('Please input valid ID value');
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

onZoneSubmit() {
  var zonenumber = {
    zone: this.zone
  }
  console.log(this.zone);

  this.dataService.getZone(this.zone).subscribe((res:Response) => {
    this.zonedata = res.json();

    this.location = this.zonedata.LOCATIONID;
    this.borough = this.zonedata.BOROUGH;
    this.zonename = this.zonedata.ZONE;
    this.servicezone = this.zonedata.SERVICE_ZONE;
    console.log(this.zonedata);
  });
}


}
