import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  dataToken: any;
  trip: any;
  zone: any;
  triptype: any;
  zonearray: any;

  constructor(private http:HttpClient) { }

  getTrip(trip) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/database/yellowtrips/' + trip, {headers: headers})

    }
  getZone(zone) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/database/zones/' + zone, {headers: headers})

    }

  getTripTimes(zone) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/database/aggregate/?zone1=' + zone + '&trip=4', {headers: headers})
  }

  getNetFlow(hour) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/database/netflow/?hour=' + hour, {headers: headers})
  }

  getPopularity(zone) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/database/timegraph/?timezone=' + zone, {headers: headers})
  }

  getNetCost(hour) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/database/cost/?hour=' + hour, {headers: headers})
  }

  getTripTimesCategory(zonearray) {
    var zonenumber = zonearray[0];
    var trip = zonearray[1];
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/database/aggregate/?zone1=' + zonenumber + '&trip=' + trip, {headers: headers})
  }
}
