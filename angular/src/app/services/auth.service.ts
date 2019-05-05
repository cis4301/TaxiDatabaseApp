import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(
    private http:HttpClient,
    private jwtHelper: JwtHelperService
  ) {}

  registerUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:4000/users/register', user, {headers: headers});
  }

  authenticateUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:4000/users/authenticate', user, {headers: headers});
  }

  getProfile() {
    this.loadToken();
    console.log(this.authToken);

    return this.http.get('http://localhost:4000/users/profile', {
      headers: new HttpHeaders().set("Authorization", this.authToken),
  });
}

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    console.log(localStorage);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {

    const isExpired = this.jwtHelper.isTokenExpired(this.authToken);
    return (!isExpired);
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
