import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ValidateService } from '../../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router,
    private el: ElementRef
  ) { }

  ngOnInit() {

  }

  onLoginSubmit() {
    var isa_error = {
        'color': '#D8000C',
        'background-color': '#FFD2D2',
        'position': 'absolute',
        'width': '100%',
        'border': '0 !important'
    }
    var flash = this.flashMessage;
    var route = this.router;

    const user = {
      username: this.username,
      password: this.password
    }

    // Validate login fields
    if(!this.validateService.validateLogin(user)) {
      flash.show('Please fill out all fields', {cssClass: 'alert-danger border-0', timeout: 3000});
      console.log("false");
      return false;
    }

    // POST request to authentication with user credentials
    this.authService.authenticateUser(user).subscribe(data => {
      console.log(data);
      if(data['success']) {
        flash.show('You are now logged in', {cssClass: 'alert-success border-0', timeout: 5000});
        this.authService.storeUserData(data['token'], data['user']);
        this.router.navigate(['/']);
      } else {
        flash.show(data['msg'], {cssClass: 'alert-danger border-0', timeout: 5000});
        route.navigate(['login']);
      }
    });

    console.log(this.username);
  }
}
