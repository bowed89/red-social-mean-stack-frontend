import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { FollowService } from '../../services/follow.service';
import { Follow } from 'src/app/models/follow';

@Component({
  selector: 'app-followed',
  templateUrl: './followed.component.html',
  providers: [FollowService, UserService]
})
export class FollowedComponent implements OnInit {

  public title: string;
  public url: string;
  public identity;
  public token;
  public status: string;
  public total;
  public pages;
  public users: User[];
  public follows;
  public followed;
  public userPageId;
  public user: any;

  // paginación
  public page;
  public next_page;
  public prev_page;

  constructor(
    private _userService: UserService,
    private _followService: FollowService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.title = 'Seguidores de';
    this.url = GLOBAL.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
   }


  ngOnInit(): void {
    this.actualPage();
  }

  
  
  actualPage() {
    this.route.params.subscribe(params => {

      let userId = params['id'];
      this.userPageId = userId;
      // parametro de la url
      let page = +params['page'];
      this.page = page;

      if (!params['page']) {
        page = 1;
      }

      if (!page) {
        page = 1;
      } else {
        this.next_page = page + 1;
        this.prev_page = page - 1;

        if (this.prev_page <= 0) {
          this.prev_page = 1;
        }
      }

      // devolver listado de usuarios
      this.getUser(userId, page);

    });
  }

  getFollows(userId, page) {
    this._followService.getFollowed(this.token, userId, page).subscribe(
      response => {

        console.log(response);
        if (!response.follows) {
          this.status = 'error';
        } else {
          this.total = response.total;
          this.followed = response.follows;
          this.pages = response.pages;
          this.follows = response.users_following;

          console.log(this.follows);

          if (page > this.pages) {
            this.router.navigate(['/gente', 1]);
          }
        }

      }, error => {
        console.log(<any>error),
        this.status = 'error';
       }
    );
  }

  public followUserOver;

  mouseEnter(user_id) {
    this.followUserOver = user_id;
  }
  mouseLeave(user_id) {
    this.followUserOver = 0;
  }

  followUser(followed) {
    var follow = new Follow('', this.identity._id, followed);

    this._followService.addFollow(this.token, follow).subscribe(
      response => {
        if (!response) {
          this.status = 'error';
        } else {
          this.status = 'success';
          this.follows.push(response.follow.followed);
        }

      }, error => {
        console.log(<any>error),
        this.status = 'error'; }
    );
  }

  unfollowUser(id) {
    this._followService.deleteFollow(this.token, id).subscribe(
      response => {
        var search = this.follows.indexOf(id);
        // si encuentra el id en el array de follows
        if (search >= 0) {
          this.follows.splice(search, 1);
        }

      }, error => {
        console.log(<any>error),
        this.status = 'error';
      }
    );
  }



  getUser(userId, page) {

    this._userService.getUser(userId).subscribe(
      response => {
        if (response.user) {
          this.user = response.user;
          // devolver listado de usuarios
            this.getFollows(userId, page);
        } else {
          this.router.navigate(['/home']);
        }

      }, error => {
        console.log(<any>error);
      }
    );

  }

}
