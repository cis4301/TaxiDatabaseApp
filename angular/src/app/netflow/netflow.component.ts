import { Component, OnInit } from '@angular/core';
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
  map: google.maps.Map;
  latitude: any;
  longitude: any;
  options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
  optionSelected: any;
  selection = false;

  constructor(
    private validateService: ValidateService,
    private dataService: DataService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {

    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: {lat: 40.710850, lng: -73.897766}
    });
    this.map.data.loadGeoJson('../../assets/convert.json');

    this.map.data.loadGeoJson('../../assets/convert.json');
    this.map.data.setStyle({fillColor: '#FFF2AF', strokeWeight: 1});

  }

  ngAfterContentInit() {

//      var listener1 = this.map.data.addListener('mouseover', function(event) {
//        if(!this.selection) {
//          this.map.data.overrideStyle(event.feature, {fillColor: 'D5D8DB', fillOpacity: 1});
//        }
//      });

//      var listener2 = this.map.data.addListener('mouseout', function(event) {
//        if(!this.selection) {
//            this.map.data.revertStyle();
//        }
//      });



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
        var hour = this.optionSelected;
        var count = 0;
        var data;
        var maxvalue = 0;
        var minvalue = 0;
        var parcel = this.messageService;
        this.selection = !this.selection;
        this.dataService.getNetFlow(hour).subscribe((res:Response) => {
        data = res;

        console.log(data);

         });


         while(!data) {
           await delay(1000);
           console.log("waited 1 second");
         }

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
               if (id === data[i].ZONE) {
                 if (data[i].NET > 0) {
                   x = data[i].NET/maxvalue * 10;
                   x = Math.round(x);

                   mappers.data.overrideStyle(feature, {fillColor: 'red', fillOpacity: 1, strokeWeight: 1, strokeColor: 'black', strokeOpacity: 1});
                 } else if (data[i].NET < 0 || data[i].NET === 0) {
                   x = data[i].NET/minvalue * -10;
                   x = Math.round(x);

                   mappers.data.overrideStyle(feature, {fillColor: 'blue', fillOpacity: 1, strokeWeight: 1, strokeColor: 'black', strokeOpacity: 1});
                 } else {

                 }

               }

             }
             });
           }

  onOptionsSelected(event){
    console.log(event); //option value will be sent as event
  }
}
