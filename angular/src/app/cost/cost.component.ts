import { Component, OnInit, ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { DataService } from '../services/data.service';
import { MessageService } from '../services/message.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-cost',
  templateUrl: './cost.component.html',
  styleUrls: ['./cost.component.css']
})
export class CostComponent implements OnInit {

  @ViewChild('overlay') el:ElementRef;
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  latitude: any;
  longitude: any;
  time: any;
  meridian: any;

  constructor(
    private validateService: ValidateService,
    private dataService: DataService,
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit() {

    this.time = {hour: 13, minute: 30};
    this.meridian = true;
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      scrollwheel: false,
      zoomControl: true,
      center: {lat: 40.710850, lng: -73.897766}
    });
    this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push
    (document.getElementById('legend'));
    this.map.data.loadGeoJson('../../assets/convert.json');
    this.map.data.setStyle({fillColor: '#FFF2AF', strokeWeight: 1});
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

  async setColor(flag: Number)  {

        const delay = ms => new Promise(res => setTimeout(res, ms));
        this.el.nativeElement.style.display='block';

        var hour = this.time['hour'];
        if (flag) {
          hour = 0;
        }

        var count = 0;
        var data;
        var maxvalue = 0;
        var minvalue = 0;
        var parcel = this.messageService;

        this.dataService.getNetCost(hour).subscribe((res:Response) => {
        data = res;

        console.log(data);

         });


         while(!data) {
           await delay(1000);
           console.log("waited 1 second");
         }

         this.el.nativeElement.style.display='none';

         for (var i in data) {
           if (maxvalue < data[i].AVERAGE) {

             maxvalue = data[i].AVERAGE;
           }
         }
         for (var i in data) {
           if (minvalue > data[i].AVERAGE) {
             minvalue = data[i].AVERAGE;
           }
         }
         console.log(maxvalue);
         console.log(minvalue);

          var mappers = this.map;
          var x = 0;
          var fillcolor;
          mappers.data.setStyle({
            fillColor: '#FFF2AF',
            strokeWeight: 1
          });


           mappers.data.forEach(function(feature) {
             var id = feature.getProperty('OBJECTID');
             for (var i  in data) {
               if (id === data[i].PICKUPZONE) {

                 console.log(data[i].AVERAGE);
                    fillcolor: '#FF2AF';

                    if (data[i].AVERAGE < 10 && data[i].AVERAGE > 0) {
                      x = data[i].AVERAGE * 10;
                      x = Math.round(x);

                      fillcolor = parcel.getColor(100-x);

                    }
                    mappers.data.overrideStyle(feature, {fillColor: fillcolor, fillOpacity: 1, strokeWeight: 1, strokeColor: 'black', strokeOpacity: 1});

                }
              }
            });
        }

  setCenter() {
    this.map.setCenter(new google.maps.LatLng(this.latitude, this.longitude));

    let location = new google.maps.LatLng(this.latitude, this.longitude);

  }

  Back() {
    this.router.navigateByUrl('/');
  }


  onOptionsSelected(event){
    console.log(event);
  }

}
