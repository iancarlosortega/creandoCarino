import { TiendaComponent } from './tienda/tienda.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DesayunosComponent } from './desayunos/desayunos.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {
    path:'',
    component: TiendaComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'desayunos', component: DesayunosComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TiendaRoutingModule { }
