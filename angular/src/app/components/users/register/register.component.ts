import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';

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
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {

}

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    // Validate submission
    // Required Fields
    var flash = this.flashMessage;
    if(!this.validateService.validateRegister(user)) {
      flash.show('Please Fill out all required fields', {
        cssClass: 'alert-danger',
        timeout: 3000
      });
      return false;
    }

    if(!this.validateService.validateEmail(user.email)) {
      flash.show('Please Enter a valid email', {
        cssClass: 'alert-danger',
        timeout: 3000
      });
      return false;
    }

    console.log("success");
    flash.show('Success!', {
      cssClass: 'alert-success',
      timeout: 3000
    });
  }
}
