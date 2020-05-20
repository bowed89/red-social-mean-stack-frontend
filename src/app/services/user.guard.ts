import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
  })
  export class UserGuard implements CanActivate {

    constructor(
        private router: Router,
        private _userService: UserService
    ) {}

    canActivate() {

        const identity = this._userService.getIdentity();

        if (identity && (identity.role === 'ROLE_USER' || identity.role === 'ROLE_ADMIN')) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }

    }


  }