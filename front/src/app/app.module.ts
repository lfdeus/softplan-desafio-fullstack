import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {SnotifyModule, SnotifyService, ToastDefaults, SnotifyPosition} from 'ng-snotify';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {registerLocaleData} from '@angular/common';
import br from '@angular/common/locales/br';
import { LoginComponent } from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import {AngularEditorModule} from '@kolkov/angular-editor';
import { ListaProcessosComponent } from './components/lista-processos/lista-processos.component';
import { ListaPendenteComponent } from './components/lista-pendente/lista-pendente.component';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { MenuComponent } from './components/menu/menu.component';
import { ParecerComponent } from './components/parecer/parecer.component';
import { ProcessoComponent } from './components/processo/processo.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import {SafeHtmlPipe} from './components/safe-html.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {HttpClientModule} from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';

ToastDefaults.toast.timeout = 3000;
ToastDefaults.toast.position = SnotifyPosition.rightTop;
registerLocaleData(br, 'pt-BR');
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    ListaProcessosComponent,
    ListaPendenteComponent,
    ListaUsuariosComponent,
    MenuComponent,
    ParecerComponent,
    ProcessoComponent,
    UsuarioComponent,
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SnotifyModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatSelectModule,
    FormsModule,
    AngularEditorModule
  ],
  providers: [
    {provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService,
    {provide: LOCALE_ID, useValue: 'pt-BR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
