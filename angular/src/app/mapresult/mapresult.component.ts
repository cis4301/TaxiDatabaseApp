import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { DataService } from '../services/data.service';
import { MessageService } from '../services/message.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-mapresult',
  templateUrl: './mapresult.component.html',
  styleUrls: ['./mapresult.component.css']
})

export class MapresultComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  mapdata: any;
  latitude: any;
  longitude: any;
  resetflag: false;
  startZone: any;
  isHidden = false;
  introdisplay: false;
  aggregateData: any;

  constructor(
    private validateService: ValidateService,
    private dataService: DataService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
        this.mapdata = this.messageService.getData();

        this.map = new google.maps.Map(document.getElementById('map'), {
          zoom: 11,
          center: {lat: 40.710850, lng: -73.897766}
        });
        this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push
        (document.getElementById('legend'));
        this.map.data.loadGeoJson('../../assets/convert.json');

        var mappy = this.map.data;
        var data = this.mapdata;
        if(data) {
          mappy.setStyle( function(feature) {
                var id = feature.getProperty('OBJECTID');
                var color = '#C3ECB2';
                var idarray = data[1];

                if (idarray.includes(id)) {
                  color = data[0][idarray.indexOf(id)];
                }
              return /** @type {!google.maps.Data.StyleOptions} */({
                fillColor: color,
                fillOpacity: 0,
                strokeColor: 'black',
                strokeOpacity: 0,
                strokeWeight: 1
            });
          });
        }

  }
  ngAfterContentInit() {

    var data = this.mapdata;
    var globalopacity = 0;
    var mappy = this.map.data;
    var content;
    var infowindow = new google.maps.InfoWindow();
    var messagePassing = this.messageService;

    for(let i = 0; i < 100; i++) {
    setTimeout ( function timer() {

         mappy.forEach(function(feature) {
             mappy.overrideStyle(feature, {
               fillOpacity: globalopacity,
               strokeOpacity: globalopacity
             });
        });
        globalopacity += .01;



    }, i*50);
}


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

async setCategory(number)  {

      const delay = ms => new Promise(res => setTimeout(res, ms));

      var count = 0;
      var data;
      var maxvalue = 0;
      var zonearray = [];
      var parcel = this.messageService;
      zonearray = parcel.getZone();

      zonearray[1] = number;
      console.log(zonearray);
      this.dataService.getTripTimesCategory(zonearray).subscribe((res:Response) => {
      this.aggregateData = res;
      data = this.aggregateData;
      console.log(data);
         for (var i in data) {
           if (maxvalue < data[i].TRIPTIME) {
             maxvalue = data[i].TRIPTIME;

           }
         }
       });
       console.log(maxvalue);
       while(!data) {
         await delay(1000);
         console.log("waited 1 second");
       }

        var mappers = this.map;
        var x = 0;
        var tripcolors = [];
        var objectid = [];
        mappers.data.setStyle({
          fillColor: '#F6CF65',
          fillOpacity: .5,
          strokeColor: 'black',
          strokeOpacity: 0,
          strokeWeight: 1

        });


         mappers.data.forEach(function(feature) {

           var id = feature.getProperty('OBJECTID');


           for (var i  in data) {
             if (id === data[i].ENDZONE) {
               x = data[i].TRIPTIME/maxvalue * 100;
               x = Math.round(x);
               mappers.data.overrideStyle(feature, {fillColor: parcel.getColor(x-1), fillOpacity: 1, strokeWeight: 1});
             }
             count++;
           }
           });
         }


  Back() {
    this.router.navigateByUrl('/maps');
  }



  setCenter() {
    this.map.setCenter(new google.maps.LatLng(this.latitude, this.longitude));

    let location = new google.maps.LatLng(this.latitude, this.longitude);

}







  }
