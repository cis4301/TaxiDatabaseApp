import { Component, OnInit } from '@angular/core';
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
    private router: Router) { }

  ngOnInit() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
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

  async setColor()  {

        const delay = ms => new Promise(res => setTimeout(res, ms));
        var hour = this.optionSelected;
        var count = 0;
        var data;
        var maxvalue = 0;
        var minvalue = 0;
        var parcel = this.messageService;
        this.selection = !this.selection;
        this.dataService.getNetCost(hour).subscribe((res:Response) => {
        data = res;

        console.log(data);

         });


         while(!data) {
           await delay(1000);
           console.log("waited 1 second");
         }

         for (var i in data) {
           if (maxvalue < data[i].PRICEPERMILE) {

             maxvalue = data[i].PRICEPERMILE;
           }
         }
         for (var i in data) {
           if (minvalue > data[i].PRICEPERMILE) {
             minvalue = data[i].PRICEPERMILE;
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

                 console.log(data[i].PRICEPERMILE);
                    fillcolor: '#FF2AF';

                    if (data[i].PRICEPERMILE < 10 && data[i].PRICEPERMILE > 0) {
                      x = data[i].PRICEPERMILE * 10;
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
