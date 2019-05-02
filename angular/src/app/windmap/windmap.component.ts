import { Component, OnInit, ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { DataService } from '../services/data.service';
import { MessageService } from '../services/message.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-windmap',
  templateUrl: './windmap.component.html',
  styleUrls: ['./windmap.component.css']
})

export class WindmapComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;
  @ViewChild('overlay') el:ElementRef;

  map: google.maps.Map;
  latitude: any;
  longitude: any;
  resetflag: false;
  startZone: any;
  data: any;
  aggregateData: any;
  wind: number = 10;
  options: Options = {
    floor: 2,
    ceil: 27,
    step: 1
  };

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

    this.map.data.loadGeoJson('../../assets/convert.json');
  }

  ngAfterContentInit() {
      this.map.data.setStyle( function(feature) {
            var color = '#fff2af';
           if (feature.getProperty('startZoneselected')) {
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
        var data;
        var index;
        var infowindow = new google.maps.InfoWindow();
        var messagePassing = this.messageService;
        var infobox = this.map.data.addListener('click', function(event) {
          index = event.feature.getProperty('OBJECTID')-1;
          content = messagePassing.getZoneArray(index);
          data = messagePassing.getJSON(index+1)
          console.log(content);
          console.log(data);

          if( data === -1) {
            infowindow.setContent(
              '<div id="content">'+
                    '<h3>'+ content[1] + '</h3>' +
                    '<div id="bodyContent">'+
                    '<pre> &#10;&#13; Borough:' + content[0] + '&#10;&#13; Neighborhood:' + content[2] + ' &#10;&#13; Type:' + content[3] + '</pre>' +
                    '</div>'+
                    '</div>'
              );
          } else {
            infowindow.setContent(
              '<div id="content">'+
                    '<h3>'+ content[1] + '</h3>' +
                    '<div id="bodyContent">'+
                    '<pre> &#10;&#13; Borough:' + content[0] + '&#10;&#13; Neighborhood:' + content[2] + ' &#10;&#13; Type:' + content[3] + '</pre>' +
                    '<p style="info-p"> &#10;&#13; Average Cost (all temps):  $' + Math.round(data['BASE']*100)/100 + '</p>' +
                    '<p style="info-p"> &#10;&#13; Average Cost (this temp):  $' + Math.round(data['TEMP']*100)/100 + '</p>' +
                    '<p style="info-p"> &#10;&#13; Difference:  $' + Math.round(data['DIFF']*100)/100 + '</p>' +

                    '</div>'+
                    '</div>'
              );
          }

          infowindow.setPosition(event.latLng);
          infowindow.open(this.map);
        });
  }

  async setWind()  {

        const delay = ms => new Promise(res => setTimeout(res, ms));
        this.el.nativeElement.style.display='block';
        var wind = this.wind;
        console.log(wind);
        var count = 0;
        var data;
        var maxvalue = 0;
        var minvalue = 0;
        var parcel = this.messageService;



        this.dataService.getWindMap(wind).subscribe((res:Response) => {
        data = res;
        console.log(data);
         });
         while(!data) {
           await delay(1000);
           console.log("waited 1 second");
         }

         this.el.nativeElement.style.display='none';
         parcel.setJSON(data);
         for (var i in data) {
           if (maxvalue < data[i].DIFF) {
             maxvalue = data[i].DIFF;
           }
         }
         for (var i in data) {
           if (minvalue > data[i].DIFF) {
             minvalue = data[i].DIFF;
           }
         }
         console.log(maxvalue);
         console.log(minvalue);

          var mappers = this.map;
          var x = 0;

          var negativeColor = ['#726c4e', '#666046', '#59543d', '#4c4834', '#3f3c2b', '#323022', '#26241a', '#191811', '#0c0c08', '#000000']
          var positiveColors = ['#e5e5ff', '#ccccff', '#b2b2ff', '#9999ff', '#7f7fff', '#6666ff', '#4c4cff', '#3333ff', '#1919ff', '#0202ff']
          mappers.data.setStyle({
            fillColor: '#FFF2AF',
            strokeWeight: 1
          });


           mappers.data.forEach(function(feature) {

             var id = feature.getProperty('OBJECTID');

             for (var i  in data) {
               if (id === data[i].ZONE) {

                 if (data[i].DIFF > 0) {
                   x = data[i].DIFF/maxvalue * 10;
                   x = (x > 9) ? 9 : x
                   x = Math.round(x);

                   mappers.data.overrideStyle(feature, {fillColor: '#fff2af', strokeWeight: 1, fillOpacity: .6, strokeColor: 'black', strokeOpacity: 1});
                 } else {
                   x = data[i].DIFF/minvalue * 10;
                   x = (x > 9) ? 9 : x
                   x = Math.round(x);
                   console.log(-x)
                   mappers.data.overrideStyle(feature, {fillColor: negativeColor[x], strokeWeight: 1, fillOpacity: 1, strokeColor: 'black', strokeOpacity: 1});
                 }
               }
             }
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

}
