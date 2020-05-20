import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  public user: User = new User('', '', '', '', '', '', 'ROLE_USER', '');
  public title = 'Registrate';
  public status: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _userServices: UserService
  ) {
   }

  ngOnInit(): void {
  }

  onSubmit(registerForm) {
    this._userServices.register(registerForm.value).subscribe(
      response => {
        if (response.user && response.user._id) {
          this.status = 'success';
          registerForm.reset();
        } else { this.status = 'error'; }
      },
      error => {console.log(<any>error)}
    );
  }

}
