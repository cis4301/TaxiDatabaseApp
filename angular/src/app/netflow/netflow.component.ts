import { Component, OnInit, ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { DataService } from '../services/data.service';
import { MessageService } from '../services/message.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-netflow',
  templateUrl: './netflow.component.html',
  styleUrls: ['./netflow.component.css']
})

export class NetflowComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;
  @ViewChild('overlay') el:ElementRef;
  map: google.maps.Map;
  latitude: any;
  longitude: any;
  time: any;
  meridian: any;

  constructor(
    private validateService: ValidateService,
    private dataService: DataService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.time = {hour: 19, minute: 30};
    this.meridian = true;
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      scrollwheel: false,
      zoomControl: true,
      center: {lat: 40.710850, lng: -73.897766}
    });
    this.map.data.loadGeoJson('../../assets/convert.json');

    this.map.data.setStyle({fillColor: '#FFF2AF', strokeWeight: 1});
	
	this.setHour();
	
  }

  ngAfterContentInit() {

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

}

  Back() {
    this.router.navigateByUrl('/');
  }

  async setHour()  {

        const delay = ms => new Promise(res => setTimeout(res, ms));
        this.el.nativeElement.style.display='block';
        var hour = this.time.hour;
        console.log(this.time);
        var count = 0;
        var data;
        var maxvalue = 0;
        var minvalue = 0;
        var parcel = this.messageService;

        this.dataService.getNetFlow(hour).subscribe((res:Response) => {
        data = res;

        console.log(data);

         });


         while(!data) {
           await delay(1000);
           console.log("waited 1 second");
         }
         this.el.nativeElement.style.display='none';

         for (var i in data) {
           if (maxvalue < data[i].NET) {

             maxvalue = data[i].NET;
           }
         }
         for (var i in data) {
           if (minvalue > data[i].NET) {
             minvalue = data[i].NET;
           }
         }
         console.log(maxvalue);
         console.log(minvalue);

          var mappers = this.map;
          var x = 0;

          var negativeColor = ['#fff0e6', '#ffe0cc', '#ffd1b3', '#ffc299', '#ffb380', '#ffa366', '#ff944d', '#ff8533', '#ff751a', '#ff6600']
          var positiveColors = ['#e6e6ff', '#ccccff', '#b3b3ff', '#9999ff', '#8080ff', '#6666ff', '#4d4dff', '#3333ff', '#1a1aff', '#0202ff']
          mappers.data.setStyle({
            fillColor: '#FFF2AF',
            strokeWeight: 1
          });


           mappers.data.forEach(function(feature) {

             var id = feature.getProperty('OBJECTID');

             for (var i  in data) {
               if (id === data[i].ZONE) {

                 if (data[i].NET > 0) {
                   x = data[i].NET/maxvalue * 10;
                   x = (x > 9) ? 9 : x
                   x = Math.round(x);

                   mappers.data.overrideStyle(feature, {fillColor: positiveColors[x], strokeWeight: 1, fillOpacity: .6, strokeColor: 'black', strokeOpacity: 1});
                 } else {
                   x = data[i].NET/minvalue * 10;
                   x = (x > 9) ? 9 : x
                   x = Math.round(x);
                   console.log(-x)
                   mappers.data.overrideStyle(feature, {fillColor: negativeColor[x], strokeWeight: 1, fillOpacity: 1, strokeColor: 'black', strokeOpacity: 1});
                 }
               }
             }
             });
           }

  onOptionsSelected(event){
    console.log(event); //option value will be sent as event
  }
}
