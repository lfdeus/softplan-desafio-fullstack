import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {UsuarioLogin} from '../base.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  sair() {
    sessionStorage.removeItem('loggedUser');
  }

  login(user: string, pass: string): Observable<{ erro?: string; retorno?: any }> {
    const options = {};
    const dto = new UsuarioLogin();
    dto.password = pass;
    dto.username = user;
    const url = environment.api + '/login';
    return this.http.post(url, dto, options).pipe(map((response: any) => {
      return {retorno: response};
    }), catchError(error => {
      return of({erro: error.error});
    }));
  }
}
