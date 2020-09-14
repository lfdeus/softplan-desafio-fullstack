import {Component, OnInit} from '@angular/core';
import {tap} from 'rxjs/operators';
import {LoginService} from '../../service/login.service';
import {SessaoService} from '../../service/sessao.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SnotifyService} from 'ng-snotify';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup = new FormGroup({
    user: new FormControl('', [Validators.required, Validators.minLength(3)]),
    pass: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  constructor(private service: LoginService,
              private sessao: SessaoService,
              private route: ActivatedRoute,
              private router: Router,
              private snotifyService: SnotifyService) {
  }

  ngOnInit(): void {
  }

  formValid(): boolean {
    return this.formGroup.valid;
  }

  login(): void {
    this.service.login(this.formGroup.get('user').value, this.formGroup.get('pass').value).pipe(
      tap(result => {
        if (result.retorno) {
          this.sessao.loggedUser = result.retorno;
          this.router.navigate(['home']);
        } else {
          this.snotifyService.error(result.erro);
        }
      })
    ).subscribe(() => {
    });
  }
}
