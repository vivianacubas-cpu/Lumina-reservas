import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { ServiciosComponent } from './pages/servicios.component';
import { ReservarComponent } from './pages/reservar.component';
import { MisReservasComponent } from './pages/mis-reservas.component';

export const routes: Routes = [
  {path:'',component:HomeComponent,data:{anim:'home'}},
  {path:'servicios',component:ServiciosComponent,data:{anim:'servicios'}},
  {path:'reservar',component:ReservarComponent,data:{anim:'reservar'}},
  {path:'mis-reservas',component:MisReservasComponent,data:{anim:'mis'}},
  {path:'**',redirectTo:''}
];
