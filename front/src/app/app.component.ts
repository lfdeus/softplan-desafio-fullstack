import { Component } from '@angular/core';
import {SessaoService} from './service/sessao.service';
import {Usuario} from './base.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Gestão de Processos';

  constructor(private sessao: SessaoService,
              private router: Router) {
  }

  usuario(): Usuario {
    return this.sessao.loggedUser;
  }

  class(): string {
    if (this.router.url.includes('home')) {
      return 'home';
    } else if (this.usuario()) {
      return 'conteudo';
    } else {
      return 'conteudo-login';
    }
  }
}
