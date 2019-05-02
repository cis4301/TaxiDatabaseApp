import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateEmpty(trip){
    if(trip.id == undefined) {
      return false;
    } else {
      return true;
    }
  }

  validatePositive(trip){
    if(trip.id < 0) {
      return false;
    } else {
      return true;
    }
  }
}
