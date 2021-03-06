/// <reference types="@types/googlemaps" />
import { Component, OnInit, ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ValidateService } from '../../../services/validate.service';
import { DataService } from '../../../services/data.service';
import { MessageService } from '../../../services/message.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})

export class MainmapsComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  @ViewChild('overlay') el:ElementRef;

  map: google.maps.Map;
  latitude: any;
  longitude: any;
  resetflag: false;
  startZone: any;
  aggregateData: any;


  iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';

  markerTypes = [
    {
      text: "Parking", value: "parking_lot_maps.png"
    }
  ];

  selectedMarkerType: string = "parking_lot_maps.png";
  isHidden = false;

  constructor(
    private validateService: ValidateService,
    private dataService: DataService,
    private messageService: MessageService,
    private router: Router
  ) { }

  mapdata = this.map;

  ngOnInit() {
    let mapProp = {
      center: new google.maps.LatLng(40.710850, - 73.897766),
      zoom: 11,
      scrollwheel: false,
      zoomControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    this.map.data.loadGeoJson('../../../assets/convert.json');

  }

  ngAfterContentInit() {



    this.map.data.setStyle( function(feature) {

          var color = '#fff2af';
         if (feature.getProperty('startZoneselected')) {

            color = feature.getProperty('color');

          }

          if (feature.getProperty('endZoneselected')) {
            color = feature.getProperty('color');
          }
          return /** @type {!google.maps.Data.StyleOptions} */({
            fillColor: color,
            fillOpacity: .4,
            strokeColor: 'black',
            strokeWeight: 1
        });
      });

      var content;
      var infowindow = new google.maps.InfoWindow();
      var messagePassing = this.messageService;
      var infobox = this.map.data.addListener('click', function(event) {
        content = messagePassing.getZoneArray(event.feature.getProperty('OBJECTID')-1);
        console.log(content);
        infowindow.setContent(
          '<div id="content">'+
                '<h3>'+ content[1] + '</h3>' +
                '<div id="bodyContent">'+
                '<pre> &#10;&#13; Borough:' + content[0] + '&#10;&#13; Neighborhood:' + content[2] + ' &#10;&#13; Type:' + content[3] + '</pre>' +

                '</div>'+
                '</div>'
          );
        infowindow.setPosition(event.latLng);
        infowindow.open(this.map);
      });

  }

  setCenter() {
    this.map.setCenter(new google.maps.LatLng(this.latitude, this.longitude));

    let location = new google.maps.LatLng(this.latitude, this.longitude);

    let marker = new google.maps.Marker({
      position: location,
      map: this.map,
      title: 'Got you!'
    });


}

  setStartZone() {
      var parcel = this.messageService;

      var listener1 = this.map.data.addListener('mouseover', function(event) {
        this.map.data.overrideStyle(event.feature, {fillColor: 'D5D8DB', fillOpacity: 1});
      });

      var listener2 = this.map.data.addListener('mouseout', function(event) {
        this.map.data.revertStyle();
      });

      var listener3 = this.map.data.addListener('click', function(event) {

        event.feature.setProperty('startZoneselected', true);
        this.startZone = event.feature.getProperty('OBJECTID');
        console.log(this.startZone);
        parcel.setStartZone(this.startZone);

      //  this.lastfeature = event.feature;
      //  console.log(this.lastfeature.getProperty('OBJECTID'));
        google.maps.event.removeListener(listener1);
        google.maps.event.removeListener(listener2);
        google.maps.event.removeListener(listener3);
      });


    }



async setObjectID()  {

    const delay = ms => new Promise(res => setTimeout(res, ms));

    this.el.nativeElement.style.display='block';
    this.startZone = this.messageService.getStartZone();
    this.messageService.setZone([this.startZone, 0]);
    var count = 0;
    var data;
    var maxvalue = 0;

      this.dataService.getTripTimes(this.startZone).subscribe((res:Response) => {
       this.aggregateData = res;
       data = this.aggregateData;
       // find the maxvalue of dataset to help with color coding
       for (var i in data) {
         if (maxvalue < data[i].TRIPTIME) {
           maxvalue = data[i].TRIPTIME;
         }
       }
     });

     while(!data) {
       await delay(1000);
       console.log("waited 1 second");
     }

     this.el.nativeElement.style.display='none';
      var mappers = this.map;
      var x = 0;
      // array of 100 color codes for our custom gradient
      var colorCodes = ['#fcefad', '#f9edab', '#f7eaa9', '#f4e8a8', '#f2e5a6', '#efe3a4', '#ede1a2', '#eadea1', '#e8dc9f', '#e5d99d', '#e2d79b', '#e0d49a', '#ddd298', '#dbd096', '#d8cd94', '#d6cb93', '#d3c891', '#d1c68f', '#cec48d', '#cbc18c', '#c9bf8a', '#c6bc88', '#c4ba86', '#c1b784', '#bfb583', '#bcb381', '#bab07f', '#b7ae7e', '#b5ab7c', '#b2a97a', '#afa678', '#ada476', '#aaa275', '#a89f73', '#a59d71', '#a39a6f', '#a0986e', '#9e966c', '#9b936a', '#989168', '#968e67', '#938c65', '#918963', '#8e8761', '#8c8560', '#89825e', '#87805c', '#847d5a', '#827b59', '#7f7857', '#7c7655', '#7a7453', '#777152', '#756f50', '#726c4e', '#706a4c', '#6d684b', '#6b6549', '#686347', '#656045', '#635e44', '#605b42', '#5e5940', '#5b573e', '#59543d', '#56523b', '#544f39', '#514d37', '#4f4b36', '#4c4834', '#494632', '#474330', '#44412f', '#423e2d', '#3f3c2b', '#3d3a29', '#3a3728', '#383526', '#353224', '#323022', '#302d21', '#2d2b1f', '#2b291d', '#28261b', '#26241a', '#232118', '#211f16', '#1e1d14', '#1c1a13', '#191811', '#16150f', '#14130d', '#11100c', '#0f0e0a', '#0c0c08', '#0a0906', '#070705', '#050403', '#020201', '#000000'];
      var tripcolors = [];
      var objectid = [];

       mappers.data.forEach(function(feature) {

         var id = feature.getProperty('OBJECTID');
         console.log(id);
         // loops through every tripID, compares TRIPTIME to maxvalue and assigns it to one of the 100 color gradient
         // "buckets" from colorCodes
         for (var i  in data) {
           if (id === data[i].ENDZONE) {

             x = data[i].TRIPTIME/maxvalue * 100;
             x = Math.round(x);
             mappers.data.overrideStyle(feature, {fillColor: colorCodes[x-1], fillOpacity: 1});
           }
         }
         });
       }

ResetSelection() {

    this.map.data.revertStyle();
    this.map.data.forEach(function(feature) {

      feature.setProperty('startZoneselected', false);
      feature.setProperty('color', '#F6CF65');
    })

}

Results() {
    this.router.navigateByUrl('/mapresults');
  }




}
