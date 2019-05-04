// Angular / browser modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng5SliderModule } from 'ng5-slider';
import { ChartsModule } from 'ng2-charts';
import { FlashMessagesModule } from 'angular2-flash-messages';

// Base App Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { TestComponent } from './components/charts/test/test.component';


// Map related components
import { CostComponent } from './components/maps/cost/cost.component';
import { MainmapsComponent } from './components/maps/main/maps.component';
import { MapsindexComponent } from './components/maps/mapsindex/mapsindex.component';
import { NetflowComponent } from './components/maps/netflow/netflow.component';
import { WeathermapComponent } from './components/maps/weathermap/weathermap.component';
import { WeathertypemapComponent } from './components/maps/weathertypemap/weathertypemap.component';
import { WindmapComponent } from './components/maps/windmap/windmap.component';

// Chart related components
import { ChartsindexComponent } from './components/charts/chartsindex/chartsindex.component';
import { NetflowchartComponent } from './components/charts/netflowchart/netflowchart.component';
import { TestchartComponent } from './components/charts/testchart/testchart.component';
import { WeatherchartComponent } from './components/charts/weatherchart/weatherchart.component';
import { WeathercostComponent } from './components/charts/weathercost/weathercost.component';
import { WeathertripavgComponent } from './components/charts/weathertripavg/weathertripavg.component';

// App services
import { ValidateService } from './services/validate.service';
import { DataService } from './services/data.service';
import { MessageService } from './services/message.service';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', component: HomeComponent},
  {path: 'test', component: TestComponent},
  {path: 'maps', component: MapsindexComponent},
  {path: 'maps/cost', component: CostComponent},
  {path: 'maps/mainmap', component: MainmapsComponent},
  {path: 'maps/netflow', component: NetflowComponent},
  {path: 'maps/weathermap', component: WeathermapComponent},
  {path: 'maps/weathertype', component: WeathertypemapComponent},
  {path: 'maps/windmap', component: WindmapComponent},
  {path: 'charts', component: ChartsindexComponent},
  {path: 'charts/netflowchart', component: NetflowchartComponent},
  {path: 'charts/testchart', component: TestchartComponent},
  {path: 'charts/weatherchart', component: WeatherchartComponent},
  {path: 'charts/weathercost', component: WeathercostComponent},
  {path: 'charts/weathertripavg', component: WeathertripavgComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    MainmapsComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    TestComponent,
    NetflowComponent,
    CostComponent,
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
    FlashMessagesModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  schemas: [],
  providers: [ValidateService, DataService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
