import { Component, OnInit } from '@angular/core';
import {SessaoService} from '../../service/sessao.service';
import {LoginService} from '../../service/login.service';
import {Router} from '@angular/router';
import {Usuario} from '../../base.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private sessao: SessaoService,
              private loginServie: LoginService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  usuario(): Usuario {
    return this.sessao.loggedUser;
  }

  sair() {
    this.loginServie.sair();
    this.router.navigate(['login']);
  }
}
