import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';
import { error } from 'protractor';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public title = 'Identificate';
  public user: User = new User('', '', '', '', '', '', 'ROLE_USER', '');
  public status: string;
  public identity;
  public token;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _userService: UserService

  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this._userService.signup(this.user).subscribe(
      response => {

        this.identity = response.user;
        this.token = response.token;

        if (!this.identity || !this.identity._id || this.token.length <= 0) {
          this.status = 'error';
        } else {
          // GUARDAR DATOS Y TOKEN EN EL LOCALSTORAGE
          localStorage.setItem('identity', JSON.stringify(this.identity));
          localStorage.setItem('token', JSON.stringify(this.token));

          // CARGAMOS LOS CONTADORES FOLLOWINS, FOLLOWERS, PUBLICATIONS
          this.getcounters();
        }
      },
      error => {
        console.log(<any>error);
        this.status = 'error';
      }
    );

  }

  getcounters() {
    this._userService.getCounters().subscribe(
      response => {
        localStorage.setItem('stats', JSON.stringify(response));
        this.status = 'success';
        // re direcciona al home
        this.router.navigate(['/home']);
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
