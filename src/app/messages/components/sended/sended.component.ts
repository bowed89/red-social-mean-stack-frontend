import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Follow } from 'src/app/models/follow';
import { Message } from '../../../models/message';
import { GLOBAL } from '../../../services/global';
import { MessageService } from '../../../services/message.service';
import { FollowService } from '../../../services/follow.service';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-sended',
  templateUrl: './sended.component.html',
  providers: [FollowService, MessageService]
})
export class SendedComponent implements OnInit {

  public title: string;
  public messages: Message;
  public identity;
  public token;
  public url: string;
  public status: string;
  public follows;
   // paginación
   public pages;
   public total;
   public page;
   public next_page;
   public prev_page;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _followService: FollowService,
    private _messageService: MessageService,
    private _userService: UserService
  ) {
    this.title = 'Mensajes enviados';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
   }

  ngOnInit(): void {
    this.actualPage();
  }

  actualPage() {
    this.route.params.subscribe(params => {

     
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

      // devolver listado de  mensajes
      this.getMessages(this.token, this.page);
    });
  }


  getMessages(token, page) {
    this._messageService.getEmmitMessages(this.token, page).subscribe(
      response => {
        this.messages = response.messages;
        this.total = response.total;
        this.pages = response.pages;

      }, error => {
        console.log(<any>error)
      }
    );
  }

}
