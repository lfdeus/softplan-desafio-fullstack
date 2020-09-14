import {Component, Input, OnInit} from '@angular/core';
import {Menu, Perfil} from '../../base.model';
import {SessaoService} from '../../service/sessao.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() menus: Array<Menu>;

  constructor(private sessao: SessaoService) {
  }

  ngOnInit(): void {
    this.menus = [
      {
        nome: 'Home',
        rota: 'home',
        icon: 'fa fa-home',
        visible: true
      }, {
        nome: 'Processos',
        rota: 'processos',
        icon: 'fa fa-file',
        visible: this.sessao.loggedUser.perfil === Perfil.TRIADOR
      }, {
        nome: 'Parecer Pendente',
        rota: 'pendente',
        icon: 'fa fa-check',
        visible: this.sessao.loggedUser.perfil === Perfil.FINALIZADOR
      }, {
        nome: 'Usuários',
        rota: 'usuarios',
        icon: 'fa fa-user',
        visible: this.sessao.loggedUser.perfil === Perfil.ADMINISTRADOR
      }
    ];
  }
}
