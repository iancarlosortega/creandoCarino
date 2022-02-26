import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '' ,loadChildren: () => import('./tienda/tienda.module').then( m => m.TiendaModule ) },
  { path: 'auth' ,loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ) },
  { path: 'admin' ,loadChildren: () => import('./admin/admin.module').then( m => m.AdminModule ) },
  { path: '**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
