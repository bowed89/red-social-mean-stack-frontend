import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FollowService } from '../../services/follow.service';
import { Follow } from 'src/app/models/follow';
import { User } from '../../models/user';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  providers: [FollowService, UserService]
})
export class ProfileComponent implements OnInit {

  public title: string;
  public user: User;
  public status: string;
  public identity;
  public token;
  public stats;
  public url;
  public followed;
  public following;

  constructor(
    private _userService: UserService,
    private _followService: FollowService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.title = 'Perfil';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.followed = false;
    this.following = false;
   }

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage() {
    this.route.params.subscribe(params => {
      const id = params['id'];

      this.getUser(id);
      this.getCounters(id);

    });
  }

  getUser(id) {
    this._userService.getUser(id).subscribe(
      response => {
        if (response.user) {
          this.user = response.user;

          if (response.following) {
            this.following = true;
          } else {
            this.following = false;
          }

          if (response.followed) {
            this.followed = true;
          } else {
            this.followed = false;
          }

        } else {
          this.status = 'error';
        }

      }, error => {
        console.log(<any>error);
        this.router.navigate(['/perfil', this.identity._id]);

      }
    );
  }

  getCounters(id) {
    this._userService.getCounters(id).subscribe(
      response => {
        this.stats = response;
      }, error => {
        console.log(<any>error);
      }
    );
  }

  followUser(followed) {

    var follow = new Follow('', this.identity._id, followed);

    this._followService.addFollow(this.token, follow).subscribe(
      response => {
        this.following = true;
    }, error => {
      console.log(<any>error);
    });
  }

  unfolloweUser(followed) {
    this._followService.deleteFollow(this.token, followed).subscribe(
      response => {
        this.following = false;
      }, error => {
        console.log(<any>error);
      }
    );
  }

  public followUserOver;

  mouseEnter(user_id) {
    this.followUserOver = user_id;
  }

  mouseLeave() {
    this.followUserOver = 0;
  }

}
