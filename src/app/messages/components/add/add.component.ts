import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Follow } from 'src/app/models/follow';
import { Message } from '../../../models/message';
import { GLOBAL } from '../../../services/global';
import { MessageService } from '../../../services/message.service';
import { FollowService } from '../../../services/follow.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  providers: [FollowService, MessageService]
})
export class AddComponent implements OnInit {

  public title: string;
  public message: Message;
  public identity;
  public token;
  public url: string;
  public status: string;
  public follows;



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _followService: FollowService,
    private _messageService: MessageService,
    private _userService: UserService
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.title = 'Enviar mensaje';
    this.message = new Message('', '', '', '', this.identity._id, '');
    this.url = GLOBAL.url;
   }

  ngOnInit(): void {
    this.getMyFollows();
  }

  getMyFollows() {
    this._followService.getMyFollows(this.token).subscribe(
      response => {
        this.follows = response.follows;
      }, error => {
        console.log(<any>error);
      }
    );
  }

  onSubmit(form) {
    this._messageService.register(this.token, this.message).subscribe(
      response => {
        this.status = 'success';
        form.reset();

      }, error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }

}
