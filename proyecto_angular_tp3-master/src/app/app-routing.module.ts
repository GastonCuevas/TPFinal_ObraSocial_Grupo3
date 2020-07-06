import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AbouthUsComponent } from './components/abouth-us/abouth-us.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { AfiliadoComponent } from './components/afiliado/afiliado.component';
import { NoticiaComponent } from './components/noticia/noticia.component';
import { NovedadComponent } from './components/novedad/novedad.component';
import { ServicioComponent } from './components/servicio/servicio.component';
import { PagoComponent } from './components/pago/pago.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'us', component: AbouthUsComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'afiliado', component: AfiliadoComponent },
  { path: 'noticia', component: NoticiaComponent },
  { path: 'novedad', component: NovedadComponent },
  { path: 'servicio', component: ServicioComponent },
  { path: 'pago', component: PagoComponent },
  { path: '**', pathMatch:'full',redirectTo:'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

