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

  validateRegister(user) {
    if(user.name == undefined || user.email == undefined || user.username == undefined || user.password == undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateLogin(user) {
    if(user.username == undefined || user.password == undefined || user.username == '' || user.password == '') {
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}
