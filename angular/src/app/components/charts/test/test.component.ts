import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../../services/validate.service';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

export class TestComponent implements OnInit {
  id: Number;
  zone: Number;
  zonetotal: any;
  datatotal: any;

  tripdata: any;
  distance: any;
  amount: any;
  passengers: any;
  pickupzone: Number;
  dropoffzone: Number;

  zonedata1: any;
  location1: any;
  borough1: any;
  zonename1: any;
  yellowexclusive1: any;

  zonedata2: any;
  location2: any;
  borough2: any;
  zonename2: any;
  yellowexclusive2: any;

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
      this.tripdata = res;
      this.id = this.tripdata.TRIPID;
      this.distance = this.tripdata.DISTANCE;
      this.amount = this.tripdata.TOTALCOST;
      this.passengers = this.tripdata.PASSENGERCOUNT;
      this.pickupzone = this.tripdata.PICKUPZONE;
      this.dropoffzone = this.tripdata.ZONEID;

      this.location1 = this.tripdata.PICKUPZONE;
      this.borough1 = this.tripdata.PICKUPBOROUGH;
      this.zonename1 = this.tripdata.PICKUPZONENAME;
      this.yellowexclusive1 = this.tripdata.PICKUPEXCLUSIVE;

      this.location2 = this.tripdata.ZONEID;
      this.borough2 = this.tripdata.BOROUGH;
      this.zonename2 = this.tripdata.ZONENAME;
      this.yellowexclusive2 = this.tripdata.YELLOWEXCLUSIVE;
      console.log(this.tripdata);
      console.log(this.pickupzone);
    });
  }

  onZoneSubmit() {
  var zonenumber = {
    zone: this.zone
  }
  console.log(this.zone);

  this.dataService.getZone(this.zone).subscribe((res:Response) => {
    this.zonedata1 = res;

    this.location1 = this.zonedata1.ZONEID;
    this.borough1 = this.zonedata1.BOROUGH;
    this.zonename1 = this.zonedata1.ZONENAME;
    this.yellowexclusive1 = this.zonedata1.YELLOWEXCLUSIVE;

  });
  this.getTotalperZone();

}

  getTotalperZone() {

    this.dataService.getZoneTotal(this.zone).subscribe((res:Response) => {
      var temp = res;
      this.zonetotal = temp[0]['TOTAL'];
    });
  }

  getTotal() {
    this.dataService.getZoneTotal(0).subscribe((res:Response) => {
      var temp = res;
      this.datatotal = temp[0]['TOTAL'];
    });
  }


}
