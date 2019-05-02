import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng5SliderModule } from 'ng5-slider';

import { AppComponent } from './app.component';
import { MapsComponent } from './maps/maps.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';
import { MapresultComponent } from './mapresult/mapresult.component';
import { NetflowComponent } from './netflow/netflow.component';
import { CostComponent } from './cost/cost.component';
import { TimegraphComponent } from './timegraph/timegraph.component';

import { ValidateService } from './services/validate.service';
import { DataService } from './services/data.service';
import { MessageService } from './services/message.service';

import { MapsindexComponent } from './mapsindex/mapsindex.component';
import { ChartsindexComponent } from './chartsindex/chartsindex.component';
import { TestchartComponent } from './charts/testchart/testchart.component';
import { ChartsModule } from 'ng2-charts';
import { WeatherchartComponent } from './charts/weatherchart/weatherchart.component';
import { WeathercostComponent } from './charts/weathercost/weathercost.component';
import { WeathertripavgComponent } from './charts/weathertripavg/weathertripavg.component';
import { WindmapComponent } from './windmap/windmap.component';
import { WeathertypemapComponent } from './weathertypemap/weathertypemap.component';
import { WeathermapComponent } from './weathermap/weathermap.component';
import { NetflowchartComponent } from './charts/netflowchart/netflowchart.component';




const appRoutes: Routes = [
  {path:'maps', component: MapsComponent},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'', component: HomeComponent},
  {path:'test', component: TestComponent},
  {path:'mapresults', component: MapresultComponent},
  {path:'netflow', component: NetflowComponent},
  {path: 'cost', component: CostComponent},
  {path: 'timegraph', component: TimegraphComponent},
  {path: 'mapsindex', component: MapsindexComponent},
  {path: 'chartsindex', component: ChartsindexComponent},
  {path: 'testchart', component: TestchartComponent},
  {path: 'weatherchart', component: WeatherchartComponent},
  {path: 'weathercost', component: WeathercostComponent},
  {path: 'weathermap', component: WeathermapComponent},
  {path: 'windmap', component: WindmapComponent},
  {path: 'weathertype', component: WeathertypemapComponent},
  {path: 'weathertripavg', component: WeathertripavgComponent},
  {path: 'netflowchart', component: NetflowchartComponent}

]

@NgModule({
  declarations: [
    AppComponent,
    MapsComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    TestComponent,
    MapresultComponent,
    NetflowComponent,
    CostComponent,
    TimegraphComponent,
    MapsindexComponent,
    ChartsindexComponent,
    TestchartComponent,
    WeatherchartComponent,
    WeathercostComponent,
    WeathermapComponent,
    WeathertypemapComponent,
    WindmapComponent,
	  WeathertripavgComponent,
	  NetflowchartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ChartsModule,
    NgbModule,
    Ng5SliderModule,
    RouterModule.forRoot(appRoutes)
  ],
  schemas: [],
  providers: [ValidateService, DataService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
