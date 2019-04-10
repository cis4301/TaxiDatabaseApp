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

  constructor(
    private validateService: ValidateService,
    private dataService: DataService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
        this.mapdata = this.messageService.getData();

        console.log(this.mapdata);
        this.map = new google.maps.Map(document.getElementById('map'), {
          zoom: 11,
          center: {lat: 40.710850, lng: -73.897766}
        });
        this.map.data.loadGeoJson('../../assets/convert.json');

        var mappy = this.map.data;
        var data = this.mapdata;




        mappy.setStyle( function(feature) {
              var id = feature.getProperty('OBJECTID');

              var color = '#F6CF65';
              var idarray = data[1];

              for (var i  in idarray) {
                if (id === idarray[i]) {
                  color = data[0][i];
                  console.log(color);
                 console.log(id);
                }
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

  ngAfterContentInit() {

    var data = this.mapdata;
    var globalopacity = 0;
    var mappy = this.map.data;


    for(let i = 0; i < 100; i++) {
    setTimeout ( function timer() {

         mappy.forEach(function(feature) {
             mappy.overrideStyle(feature, {
               fillOpacity: globalopacity,
               strokeOpacity: globalopacity
             });
        });
        globalopacity += .01;



    }, i*200);
}

}





  setMapType(mapTypeId: string) {
    this.map.setMapTypeId(mapTypeId)
  }

  Back() {
    this.router.navigateByUrl('/maps');
  }



  setCenter() {
    this.map.setCenter(new google.maps.LatLng(this.latitude, this.longitude));

    let location = new google.maps.LatLng(this.latitude, this.longitude);

}







  }
