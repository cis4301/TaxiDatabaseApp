import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class DataService {

  dataToken: any;
  trip: any;
  zone: any;

  constructor(private http:Http) { }

  getTrip(trip) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/database/yellowtrips/' + trip, {headers: headers})

    }
  getZone(zone) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/database/zones/' + zone, {headers: headers})

    }
}
