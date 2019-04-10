import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  stylingData: any;

  constructor() { }

  setData(data) {
    this.stylingData = data;
  }

  getData() {
    let temp = this.stylingData;
    return temp;
  }

  clearData() {
    this.stylingData = undefined;
  }
}
