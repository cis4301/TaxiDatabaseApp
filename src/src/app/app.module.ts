import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ChartsComponent } from './components/charts/charts.component';
import { GraphsComponent } from './components/graphs/graphs.component';

import {ValidateService} from './services/validate.service';
import {DataService} from './services/data.service';
import { TestsComponent } from './components/tests/tests.component';

const appRoutes: Routes = [
  {path:'', component: HomeComponent},
  {path:'charts', component: ChartsComponent},
  {path:'graphs', component: GraphsComponent},
  {path:'tests', component: TestsComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ChartsComponent,
    GraphsComponent,
    TestsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ValidateService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
