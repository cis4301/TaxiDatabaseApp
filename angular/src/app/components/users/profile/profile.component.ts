import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { ValidateService } from '../../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: Object;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router,
    private el: ElementRef
  ) { }

  ngOnInit() {

    this.authService.getProfile().subscribe(profile => {

      this.user = profile['user'];
    },
    err => {
      console.log(err);
      return false;
    })
  }


}
