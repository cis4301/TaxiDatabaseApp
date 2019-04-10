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
    return this.http.get('http://localhost:3000/database/aggregate/?zone1=' + zone, {headers: headers})
  }
}