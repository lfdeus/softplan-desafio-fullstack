import { Component, OnInit } from '@angular/core';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Processo, Usuario} from '../../base.model';
import {ActivatedRoute, Router} from '@angular/router';
import {SessaoService} from '../../service/sessao.service';
import {SnotifyService} from 'ng-snotify';
import {UsuarioService} from '../../service/usuario.service';
import {ProcessoService} from '../../service/processo.service';
import {AngularEditorConfig} from '@kolkov/angular-editor';

@Component({
  selector: 'app-parecer',
  templateUrl: './parecer.component.html',
  styleUrls: ['./parecer.component.scss']
})
export class ParecerComponent implements OnInit {

  processo: Processo;
  usuarios: Usuario[];
  htmlParecer = '';

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Incluir o parecer aqui...',
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
    this.processoHandler();
  }

  novo(): boolean {
    return !(this.processo.id > 0);
  }

  limparDados() {
    this.processo = new Processo();
    this.processo.id = 0;
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
          this.htmlParecer = this.processo.parecer;
        } else {
          this.snotifyService.error(result.erro);
        }
      })
    );
  }

  salvar() {
    if (this.htmlParecer.length === 0) {
      this.snotifyService.error('Informe o parecer.');
      return;
    }

    this.processo.usuarioParecer = this.sessao.loggedUser;
    this.processo.parecer = this.htmlParecer;
    let sucesso = false;
    let id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.service.salvar(id, this.processo, true).pipe(tap(result => {
        if (result.retorno) {
          this.processo = result.retorno;
          this.snotifyService.success('Parecer adicionado com sucesso');
          id = result.retorno.id;
          sucesso = true;
        } else {
          this.snotifyService.error(result.erro);
        }
      })
    ).subscribe(() => {
      if (sucesso) {
        this.router.navigate(['/parecer', id]);
      }
    });
  }

  parecerRealizado(): boolean {
    return this.processo.dataParecer != null;
  }
}
