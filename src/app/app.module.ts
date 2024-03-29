import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';

import { ReactiveFormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RolesComponent } from './pages/roles/roles.component';
import { LoginComponent } from './pages/login/login.component';
import { RoleService } from './services/roles/role.service';
import { DepartementComponent } from './pages/departement/departement.component';
import { UsersComponent } from './pages/users/users.component';
import { CompaniesComponent } from './pages/companies/companies.component';
import { VehiclesComponent } from './pages/vehicles/vehicles.component';
import { TyresComponent } from './pages/tyres/tyres.component';
import { SensorsComponent } from './pages/sensors/sensors.component';

// modal
import { ModalModule } from 'ngx-bootstrap/modal';
import { MeasuresComponent } from './pages/measures/measures.component';
import { MaterialsModule } from './materials/materials.module';
import { MeasuresPipePipe } from './pages/measures/measures-pipe.pipe';
import { MeasuresPipeBySensorPipe } from './pages/measures/measures-pipe-by-sensor.pipe';
import { MeasuresPipeByDatePipe } from './pages/measures/measures-pipe-by-date.pipe';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    RolesComponent,
    LoginComponent,
    DepartementComponent,
    UsersComponent,
    CompaniesComponent,
    VehiclesComponent,
    TyresComponent,
    SensorsComponent,
    MeasuresComponent,
    MeasuresPipePipe,
    MeasuresPipeBySensorPipe,
    MeasuresPipeByDatePipe,

  ],
  imports: [
    FormsModule,
    HttpModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    NgxPaginationModule,
    ReactiveFormsModule,
    MaterialsModule
  ],
  providers: [
    RoleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
