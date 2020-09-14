import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {ListaUsuariosComponent} from './components/lista-usuarios/lista-usuarios.component';
import {UsuarioComponent} from './components/usuario/usuario.component';
import {ListaProcessosComponent} from './components/lista-processos/lista-processos.component';
import {ProcessoComponent} from './components/processo/processo.component';
import {ParecerComponent} from './components/parecer/parecer.component';
import {ListaPendenteComponent} from './components/lista-pendente/lista-pendente.component';


const routes: Routes = [{
  path: 'login',
  component: LoginComponent
}, {
  path: 'home',
  component: HomeComponent
}, {
  path: 'usuarios',
  component: ListaUsuariosComponent
}, {
  path: 'usuario/:id',
  component: UsuarioComponent
}, {
  path: 'processos',
  component: ListaProcessosComponent
}, {
  path: 'processo/:id',
  component: ProcessoComponent
}, {
  path: 'pendente',
  component: ListaPendenteComponent
}, {
  path: 'parecer/:id',
  component: ParecerComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
