import { TiendaComponent } from './tienda/tienda.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PagoComponent } from './pago/pago.component';
import { GuiaComponent } from './guia/guia.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { VerMasComponent } from './ver-mas/ver-mas.component';

const routes: Routes = [
	{
		path: '',
		component: TiendaComponent,
		children: [
			{ path: '', component: HomeComponent },
			{ path: ':name/:id', component: CategoriasComponent },
			{ path: 'producto/:category/:id', component: VerMasComponent },
			{ path: 'pago', component: PagoComponent },
			{ path: 'guia', component: GuiaComponent },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class TiendaRoutingModule {}
