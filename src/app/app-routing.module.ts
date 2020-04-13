import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RolesComponent } from './pages/roles/roles.component';
import { DepartementComponent } from './pages/departement/departement.component';
import { UsersComponent } from './pages/users/users.component';
import { CompaniesComponent } from './pages/companies/companies.component';
import { VehiclesComponent } from './pages/vehicles/vehicles.component';
import { TyresComponent } from './pages/tyres/tyres.component';
import { SensorsComponent } from './pages/sensors/sensors.component';
import { MeasuresComponent } from './pages/measures/measures.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  // dashboard path
  {path: 'dashboard', component: DashboardComponent},
  // dashboard path
  {path: 'measures', component: MeasuresComponent},
  // roles path
  {path: 'roles', component: RolesComponent},
  // path of departement
  {path: 'departements', component: DepartementComponent},
  // users
  {path:'users',component:UsersComponent},
  // companies
  {path:'companies',component:CompaniesComponent},
  // vehicles
  {path:'vehicles',component:VehiclesComponent},
  // tyres
  {path:'tyres',component:TyresComponent},
  // Sensors
  {path:'sensors',component:SensorsComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
