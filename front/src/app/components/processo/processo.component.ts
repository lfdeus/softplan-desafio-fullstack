import { Component, OnInit } from '@angular/core';
import {Processo, Usuario} from '../../base.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {ProcessoService} from '../../service/processo.service';
import {UsuarioService} from '../../service/usuario.service';
import {SessaoService} from '../../service/sessao.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SnotifyService} from 'ng-snotify';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-processo',
  templateUrl: './processo.component.html',
  styleUrls: ['./processo.component.scss']
})
export class ProcessoComponent implements OnInit {

  processo: Processo;
  formGroup = new FormGroup({
    descricao: new FormControl('', [Validators.required, Validators.minLength(3)]),
    usuariosParecer: new FormControl()
  });
  usuarios: Usuario[];
  htmlProcesso = '';

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Incluir o processo aqui...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ]
  };

  constructor(private service: ProcessoService,
              private usuarioService: UsuarioService,
              private sessao: SessaoService,
              private route: ActivatedRoute,
              private router: Router,
              private snotifyService: SnotifyService) {
  }

  ngOnInit(): void {
    this.limparDados();
    this.todosUsuariosHandler();
    this.processoHandler();
  }

  todosUsuariosHandler() {
    this.obterTodosUsuarios().subscribe(() => {
    });
  }

  private obterTodosUsuarios(): Observable<any> {
    return this.usuarioService.consultar(0, true).pipe(
      tap(result => {
        if (result.retorno) {
          this.usuarios = result.retorno;
        } else {
          console.log(result);
          this.snotifyService.error('Não foi possível obter os usuários, tente novamente.');
        }
      })
    );
  }

  novo(): boolean {
    return !(this.processo.id > 0);
  }

  parecerRealizado(): boolean {
    return this.processo.dataParecer != null;
  }

  limparDados() {
    this.processo = new Processo();
    this.processo.id = 0;
    this.formGroup.get('descricao').setValue('');
    this.formGroup.get('usuariosParecer').setValue([]);
    this.htmlProcesso = '';
  }

  processoHandler() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    if (id > 0) {
      this.obterProcesso(id).subscribe(() => {
      });
    }
  }

  private obterProcesso(id: number): Observable<any> {
    return this.service.consultar(id, false, 0).pipe(
      tap(result => {
        if (result.retorno) {
          this.processo = result.retorno;
          this.formGroup.get('descricao').setValue(this.processo.descricao);
          this.htmlProcesso = this.processo.processo;
          this.formGroup.get('usuariosParecer').setValue([]);
          const teste = [];
          for (const usuario of this.processo.usuariosParecer) {
            teste.push(usuario);
          }
          this.formGroup.get('usuariosParecer').setValue(teste);
        } else {
          this.snotifyService.error(result.erro);
        }
      })
    );
  }

  salvar() {
    let id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    if (!this.formGroup.get('descricao').valid) {
      this.snotifyService.error('Informe uma descricao curta.');
      return;
    }
    if (this.htmlProcesso.length === 0) {
      this.snotifyService.error('Informe o processo.');
      return;
    }
    console.log(this.formGroup.get('usuariosParecer').value);
    if (!this.formGroup.get('usuariosParecer').value || this.formGroup.get('usuariosParecer').value.length === 0) {
      this.snotifyService.error('Selecione pelo menos um usuário para realizar o parecer.');
      return;
    }

    this.processo.usuariosParecer = [];
    for (const usuario of this.formGroup.get('usuariosParecer').value) {
      this.processo.usuariosParecer.push(usuario);
    }

    this.processo.descricao = this.formGroup.get('descricao').value;
    this.processo.usuarioProcesso = this.sessao.loggedUser;
    this.processo.processo = this.htmlProcesso;
    let sucesso = false;
    this.service.salvar(id, this.processo, false).pipe(tap(result => {
        if (result.retorno) {
          if (id > 0) {
            this.snotifyService.success('Processo alterado com sucesso');
          } else {
            this.snotifyService.success('Processo criado com sucesso');
          }
          id = result.retorno.id;
          sucesso = true;
        } else {
          this.snotifyService.error(result.erro);
        }
      })
    ).subscribe(() => {
      if (sucesso) {
        this.router.navigate(['/processo', id]);
      }
    });
  }

  formatarData(date: number): Date {
    return new Date(date);
  }
}
