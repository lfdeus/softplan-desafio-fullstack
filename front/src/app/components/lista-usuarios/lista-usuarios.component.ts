import { Component, OnInit } from '@angular/core';
import {Perfil, Usuario} from '../../base.model';
import {Observable} from 'rxjs';
import {SnotifyService} from 'ng-snotify';
import {UsuarioService} from '../../service/usuario.service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit {

  lista: Usuario[];

  constructor(private service: UsuarioService,
              private snotifyService: SnotifyService) {
  }

  ngOnInit(): void {
    this.todosHandler();
  }

  todosHandler() {
    this.obterTodos().subscribe(() => {
    });
  }

  private obterTodos(): Observable<any> {
    return this.service.consultar(0, false).pipe(
      tap(result => {
        if (result.retorno) {
          this.lista = result.retorno;
        } else {
          console.log(result);
          this.snotifyService.error('Não foi possível obter os usuários, tente novamente.');
        }
      })
    );
  }

  perfilApresentar(id: string) {
    if (id === Perfil.ADMINISTRADOR) {
      return 'Administrador';
    }
    if (id === Perfil.TRIADOR) {
      return 'Usuário Triador';
    }
    if (id === Perfil.FINALIZADOR) {
      return 'Usuário Finalizador';
    }
  }
}
