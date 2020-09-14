import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {Usuario} from '../base.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) {
  }

  consultar(id: number, somenteAtivos: boolean): Observable<{ erro?: string; retorno?: any }> {
    const somenteAtivosP = somenteAtivos ? 't' : 'f';
    const options = {
      params:
        {
          ativo: somenteAtivosP
        }
    };

    let url = environment.api + '/usuario';
    if (id > 0) {
      url += '/' + id;
    }
    return this.http.get(url, options).pipe(map((response: any) => {
      return {retorno: response};
    }), catchError(error => {
      return of({erro: error.error});
    }));
  }

  salvar(id: number, dto: Usuario): Observable<{ erro?: string; retorno?: any }> {
    if (id > 0) {
      const url = environment.api + '/usuario/' + id;
      return this.http.put(url, dto, {}).pipe(map((response: any) => {
        return {retorno: response};
      }), catchError(error => {
        return of({erro: error.error});
      }));
    } else {
      const url = environment.api + '/usuario';
      return this.http.post(url, dto, {}).pipe(map((response: any) => {
        return {retorno: response};
      }), catchError(error => {
        return of({erro: error.error});
      }));
    }
  }
}
