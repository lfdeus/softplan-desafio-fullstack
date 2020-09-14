import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {SnotifyService} from 'ng-snotify';
import {ProcessoService} from '../../service/processo.service';
import {Processo} from '../../base.model';

@Component({
  selector: 'app-lista-processos',
  templateUrl: './lista-processos.component.html',
  styleUrls: ['./lista-processos.component.scss']
})
export class ListaProcessosComponent implements OnInit {

  lista: Processo[];

  constructor(private service: ProcessoService,
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
    return this.service.consultar(0, false, 0).pipe(
      tap(result => {
        if (result.retorno) {
          this.lista = result.retorno;
        } else {
          console.log(result);
          this.snotifyService.error('Não foi possível obter os processos, tente novamente.');
        }
      })
    );
  }
}
