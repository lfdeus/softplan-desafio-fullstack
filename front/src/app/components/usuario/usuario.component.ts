import { Component, OnInit } from '@angular/core';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Usuario} from '../../base.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsuarioService} from '../../service/usuario.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SnotifyService} from 'ng-snotify';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  usuario: Usuario;
  formGroup = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
    perfil: new FormControl(''),
    ativo: new FormControl(true)
  });

  constructor(private service: UsuarioService,
              private route: ActivatedRoute,
              private router: Router,
              private snotifyService: SnotifyService) {
  }

  ngOnInit(): void {
    this.limparDados();
    this.usuarioHandler();
  }

  novo(): boolean {
    return !(this.usuario.id > 0);
  }

  limparDados() {
    this.usuario = new Usuario();
    this.usuario.id = 0;
    this.formGroup.get('nome').setValue('');
    this.formGroup.get('username').setValue('');
    this.formGroup.get('password').setValue('');
    this.formGroup.get('perfil').setValue('');
    this.formGroup.get('ativo').setValue(true);
  }

  usuarioHandler() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    if (id > 0) {
      this.obterUsuario(id).subscribe(() => {
      });
    }
  }

  private obterUsuario(id: number): Observable<any> {
    return this.service.consultar(id, false).pipe(
      tap(result => {
        if (result.retorno) {
          this.usuario = result.retorno;
          this.formGroup.get('nome').setValue(this.usuario.nome);
          this.formGroup.get('username').setValue(this.usuario.username);
          this.formGroup.get('password').setValue(this.usuario.password);
          this.formGroup.get('perfil').setValue(this.usuario.perfil);
          this.formGroup.get('ativo').setValue(this.usuario.ativo);
        } else {
          this.snotifyService.error(result.erro);
        }
      })
    );
  }

  salvar() {
    let id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    if (!this.formGroup.get('nome').valid) {
      this.snotifyService.error('Informe o nome.');
      return;
    }
    if (!this.formGroup.get('username').valid) {
      this.snotifyService.error('Informe o username.');
      return;
    }
    if (id === 0 && !this.formGroup.get('password').valid) {
      this.snotifyService.error('Informe o password.');
      return;
    }
    if (!this.formGroup.get('perfil').valid) {
      this.snotifyService.error('Informe o perfil.');
      return;
    }

    this.usuario.nome = this.formGroup.get('nome').value;
    this.usuario.username = this.formGroup.get('username').value;
    this.usuario.password = this.formGroup.get('password').value;
    this.usuario.perfil = this.formGroup.get('perfil').value;
    this.usuario.ativo = this.formGroup.get('ativo').value;
    let sucesso = false;
    this.service.salvar(id, this.usuario).pipe(tap(result => {
        if (result.retorno) {
          if (id > 0) {
            this.snotifyService.success('Usuário alterado com sucesso');
          } else {
            this.snotifyService.success('Usuário criado com sucesso');
          }
          id = result.retorno.id;
          sucesso = true;
        } else {
          this.snotifyService.error(result.erro);
        }
      })
    ).subscribe(() => {
      if (sucesso) {
        this.router.navigate(['/usuario', id]);
      }
    });
  }
}
