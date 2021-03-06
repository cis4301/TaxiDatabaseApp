import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ValidateService } from '../../../services/validate.service';
import { DataService } from '../../../services/data.service';
import { MessageService } from '../../../services/message.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-mapsindex',
  templateUrl: './mapsindex.component.html',
  styleUrls: ['./mapsindex.component.css']
})
export class MapsindexComponent implements OnInit {

  constructor(
    private validateService: ValidateService,
    private dataService: DataService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
  }

}
