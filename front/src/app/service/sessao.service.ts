import { Injectable } from '@angular/core';
import {Usuario} from '../base.model';

@Injectable({
  providedIn: 'root'
})
export class SessaoService {

  constructor() { }

  get loggedUser(): Usuario {
    return JSON.parse(sessionStorage.getItem('loggedUser'));
  }

  set loggedUser(usuario: Usuario) {
    sessionStorage.setItem('loggedUser', JSON.stringify(usuario));
  }
}
