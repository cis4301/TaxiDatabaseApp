// Angular / browser modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng5SliderModule } from 'ng5-slider';
import { ChartsModule } from 'ng2-charts';

// Base App Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';

// Map related components
import { CostComponent } from './map/cost/cost.component';
import { MapsComponent } from './map/maps/maps.component';
import { MapsindexComponent } from './map/mapsindex/mapsindex.component';
import { NetflowComponent } from './map/netflow/netflow.component';
import { WeathermapComponent } from './map/weathermap/weathermap.component';
import { WeathertypemapComponent } from './map/weathertypemap/weathertypemap.component';
import { WindmapComponent } from './map/windmap/windmap.component';

// Chart related components
import { ChartsindexComponent } from './charts/chartsindex/chartsindex.component';
import { NetflowchartComponent } from './charts/netflowchart/netflowchart.component';
import { TestchartComponent } from './charts/testchart/testchart.component';
import { WeatherchartComponent } from './charts/weatherchart/weatherchart.component';
import { WeathercostComponent } from './charts/weathercost/weathercost.component';
import { WeathertripavgComponent } from './charts/weathertripavg/weathertripavg.component';

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
  {path: 'maps/map', component: MapsComponent},
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
    MapsComponent,
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
    RouterModule.forRoot(appRoutes)
  ],
  schemas: [],
  providers: [ValidateService, DataService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
