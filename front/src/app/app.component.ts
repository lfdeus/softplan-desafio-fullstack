import { Component } from '@angular/core';
import {SessaoService} from './service/sessao.service';
import {Usuario} from './base.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Gestão de Processos';

  constructor(private sessao: SessaoService) {
  }

  usuario(): Usuario {
    return this.sessao.loggedUser;
  }
}
