import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService]
})
export class AppComponent {
  title = 'NGSOCIAL';
  public identity;
  public url = GLOBAL.url;

  constructor(
    private _userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.identity = this._userService.getIdentity();
  }
  // actualiza dinamicamente el identity para que muestre el menu si esq esta logueado
  ngDoCheck() {
    this.identity = this._userService.getIdentity();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
