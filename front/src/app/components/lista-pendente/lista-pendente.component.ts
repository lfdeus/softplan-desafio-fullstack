import { Component, OnInit } from '@angular/core';
import {Processo} from '../../base.model';
import {ProcessoService} from '../../service/processo.service';
import {SessaoService} from '../../service/sessao.service';
import {SnotifyService} from 'ng-snotify';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-lista-pendente',
  templateUrl: './lista-pendente.component.html',
  styleUrls: ['./lista-pendente.component.scss']
})
export class ListaPendenteComponent implements OnInit {

  lista: Processo[];

  constructor(private service: ProcessoService,
              private sessao: SessaoService,
              private snotifyService: SnotifyService) {
  }

  ngOnInit(): void {
    this.todosHandler();
  }

  todosHandler() {
    this.obterTodos().subscribe(() => {
    });
  }

  formatarData(date: number): Date {
    return new Date(date);
  }

  private obterTodos(): Observable<any> {
    return this.service.consultar(0, true, this.sessao.loggedUser.id).pipe(
      tap(result => {
        if (result.retorno) {
          this.lista = result.retorno;
        } else {
          console.log(result);
          this.snotifyService.error('Não foi possível obter os processos pendentes, tente novamente.');
        }
      })
    );
  }
}
