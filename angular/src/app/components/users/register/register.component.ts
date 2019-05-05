import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ValidateService } from '../../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  name: String;
  username: String;
  email: String;
  password: String;


  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router,
    private el: ElementRef
  ) { }

  ngOnInit() { }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    // Validate required fields
    var flash = this.flashMessage;
    if(!this.validateService.validateRegister(user)) {
      flash.show('Please fill out all required fields', {cssClass: 'alert-danger border-0', timeout: 3000});
      return false;
    }

    // Validate email
    if(!this.validateService.validateEmail(user.email)) {
      flash.show('Please enter a valid email address', {cssClass: 'alert-danger border-0', timeout: 3000});
      return false;
    }

    // Call to Auth Service to POST user
    this.authService.registerUser(user).subscribe(data => {
      if(data) {
        flash.show('User has been registered', {cssClass: 'alert-success border-0', timeout: 3000});
        this.router.navigate(['/login']);
      } else {
        flash.show('Something went wrong', {cssClass: 'alert-danger border-0', timeout: 3000});
      }
    })


  }
}
