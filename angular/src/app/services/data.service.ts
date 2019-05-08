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
    return this.http.get('http://reldatahackleman.hopto.org:8001/database/yellowtrips/' + trip, {headers: headers})

    }
  getZone(zone) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://reldatahackleman.hopto.org:8001/database/zones/' + zone, {headers: headers})

    }

  getZoneTotal(zone) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://reldatahackleman.hopto.org:8001/database/totals/?total=' + zone, {headers: headers})
  }

  getTripTimes(zone) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://reldatahackleman.hopto.org:8001/database/aggregate/?zone1=' + zone + '&trip=4', {headers: headers})
  }

  getNetFlow(hour) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://reldatahackleman.hopto.org:8001/database/netflow/?hour=' + hour, {headers: headers})
  }

  getPopularity(zone) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://reldatahackleman.hopto.org:8001/database/timegraph/?timezone=' + zone, {headers: headers})
  }
  // Routes for Weather charts based on average trip time

  getTempResults() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://reldatahackleman.hopto.org:8001/database/weathergraph/?type=2', {headers: headers})
  }

  getWindspeed() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://reldatahackleman.hopto.org:8001/database/weathergraph/?type=1', {headers: headers})
  }

  getCondition() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://reldatahackleman.hopto.org:8001/database/weathergraph/?type=3', {headers: headers})
  }
  // Routes for Weather charts based on average fare

  getTempResults2() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://reldatahackleman.hopto.org:8001/database/weathergraph/?type=4', {headers: headers})
  }

  getWindspeed2() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://reldatahackleman.hopto.org:8001/database/weathergraph/?type=6', {headers: headers})
  }

  getCondition2() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://reldatahackleman.hopto.org:8001/database/weathergraph/?type=5', {headers: headers})
  }

  getTempMap(temp) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://reldatahackleman.hopto.org:8001/database/weathermap/?temperature=' + temp, {headers: headers})

  }

  getTypeMap(type) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://reldatahackleman.hopto.org:8001/database/weathermap/?type=' + type, {headers: headers})

  }

  getWindMap(wind) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://reldatahackleman.hopto.org:8001/database/weathermap/?windspeed=' + wind, {headers: headers})

  }

  getNetCost(hour) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://reldatahackleman.hopto.org:8001/database/cost/?hour=' + hour, {headers: headers})
  }

  getTripTimesCategory(zonearray) {
    var zonenumber = zonearray[0];
    var trip = zonearray[1];
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://reldatahackleman.hopto.org:8001/database/aggregate/?zone1=' + zonenumber + '&trip=' + trip, {headers: headers})
  }

  getweathertripavg() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://reldatahackleman.hopto.org:8001/database/weathertripavg', {headers: headers})
  }

  getnetflowchart(zone) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://reldatahackleman.hopto.org:8001/database/netflowchart/?zone=' + zone, {headers: headers})
  }
}
