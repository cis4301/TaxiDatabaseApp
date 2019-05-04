import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router,
    private el: ElementRef
  ) { }

  ngOnInit() {
  }

  onLogoutClick() {
    this.authService.logout();
    this.flashMessage.show('You are logged out', {cssClass: 'alert-success border-0', timeout: 3000});
    this.router.navigate(['/login']);
    return false;
  }
}
