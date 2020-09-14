import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {Processo} from '../base.model';

@Injectable({
  providedIn: 'root'
})
export class ProcessoService {

  constructor(private http: HttpClient) {
  }

  consultar(id: number, pendente: boolean, idUsuario: number): Observable<{ erro?: string; retorno?: any }> {
    const parecerP = pendente ? 't' : 'f';
    const options = {
      params:
        {
          id: idUsuario.toString(),
          p: parecerP
        }
    };

    let url = environment.api + '/processo';
    if (id > 0) {
      url += '/' + id;
    }
    return this.http.get(url, options).pipe(map((response: any) => {
      return {retorno: response};
    }), catchError(error => {
      return of({erro: error.error});
    }));
  }

  salvar(id: number, dto: Processo, incluindoParecer: boolean): Observable<{ erro?: string; retorno?: any }> {
    const parecerP = incluindoParecer ? 't' : 'f';
    const options = {
      params:
        {
          parecer: parecerP
        }
    };
    if (id > 0) {
      const url = environment.api + '/processo/' + id;
      return this.http.put(url, dto, options).pipe(map((response: any) => {
        return {retorno: response};
      }), catchError(error => {
        return of({erro: error.error});
      }));
    } else {
      const url = environment.api + '/processo';
      return this.http.post(url, dto, options).pipe(map((response: any) => {
        return {retorno: response};
      }), catchError(error => {
        return of({erro: error.error});
      }));
    }
  }
}
