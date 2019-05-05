// Angular modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng5SliderModule } from 'ng5-slider';
import { ChartsModule } from 'ng2-charts';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { JwtModule } from '@auth0/angular-jwt';

// App Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { TestComponent } from './components/charts/test/test.component';
import { ProfileComponent } from './components/users/profile/profile.component';

// Maps components
import { CostComponent } from './components/maps/cost/cost.component';
import { MainmapsComponent } from './components/maps/main/maps.component';
import { MapsindexComponent } from './components/maps/mapsindex/mapsindex.component';
import { NetflowComponent } from './components/maps/netflow/netflow.component';
import { WeathermapComponent } from './components/maps/weathermap/weathermap.component';
import { WeathertypemapComponent } from './components/maps/weathertypemap/weathertypemap.component';
import { WindmapComponent } from './components/maps/windmap/windmap.component';

// Charts components
import { ChartsindexComponent } from './components/charts/chartsindex/chartsindex.component';
import { NetflowchartComponent } from './components/charts/netflowchart/netflowchart.component';
import { TestchartComponent } from './components/charts/testchart/testchart.component';
import { WeatherchartComponent } from './components/charts/weatherchart/weatherchart.component';
import { WeathercostComponent } from './components/charts/weathercost/weathercost.component';
import { WeathertripavgComponent } from './components/charts/weathertripavg/weathertripavg.component';

// Services
import { ValidateService } from './services/validate.service';
import { DataService } from './services/data.service';
import { MessageService } from './services/message.service';
import { AuthService } from './services/auth.service';

// Directives and guards
import { AppPasswordDirective } from './directives/app-password.directive';
import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path: '', component: HomeComponent},
  {path: 'test', component: TestComponent, canActivate:[AuthGuard]},
  {path: 'maps', component: MapsindexComponent, canActivate:[AuthGuard]},
  {path: 'maps/cost', component: CostComponent, canActivate:[AuthGuard]},
  {path: 'maps/mainmap', component: MainmapsComponent, canActivate:[AuthGuard]},
  {path: 'maps/netflow', component: NetflowComponent, canActivate:[AuthGuard]},
  {path: 'maps/weathermap', component: WeathermapComponent, canActivate:[AuthGuard]},
  {path: 'maps/weathertype', component: WeathertypemapComponent, canActivate:[AuthGuard]},
  {path: 'maps/windmap', component: WindmapComponent, canActivate:[AuthGuard]},
  {path: 'charts', component: ChartsindexComponent, canActivate:[AuthGuard]},
  {path: 'charts/netflowchart', component: NetflowchartComponent, canActivate:[AuthGuard]},
  {path: 'charts/testchart', component: TestchartComponent, canActivate:[AuthGuard]},
  {path: 'charts/weatherchart', component: WeatherchartComponent, canActivate:[AuthGuard]},
  {path: 'charts/weathercost', component: WeathercostComponent, canActivate:[AuthGuard]},
  {path: 'charts/weathertripavg', component: WeathertripavgComponent, canActivate:[AuthGuard]}
]

export function jwtTokenGetter() {
    return localStorage.getItem('id_token');
}

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
	  NetflowchartComponent,
	  AppPasswordDirective,
	  ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ChartsModule,
    NgbModule,
    Ng5SliderModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter
        }
    }),
    FlashMessagesModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  schemas: [],
  providers: [ValidateService, DataService, MessageService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
