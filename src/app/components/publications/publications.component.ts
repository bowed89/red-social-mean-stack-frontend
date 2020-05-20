import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Publication } from '../../models/publication';
import { GLOBAL } from '../../services/global';
import { PublicationService } from '../../services/publication.service';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styles: []
})
export class PublicationsComponent implements OnInit {
  public identity;
  public token;
  public title;
  public url;
  public status;
  public page;
  public total;
  public pages;
  public itemsPerPage;
  public noMore = false;
  public publications: any;
  @Input() user: string;

  constructor(
    private _userService: UserService,
    private _publicationService: PublicationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.title = 'Publications';
    this.page = 1;
   }

  ngOnInit(): void {
     this.getPublications(this.user, this.page);
  }

  getPublications(user, page, adding = false) {
    this._publicationService.getPublicationsUser(this.token, user, page ).subscribe(
      response => {
        if (response.publications) {
          this.total = response.total_items;
          this.pages = response.pages;
          this.itemsPerPage = response.items_per_page;

          if (adding === false) {
            this.publications = response.publications;
          } else {
            const arrayA = this.publications;
            const arrayB = response.publications;
            this.publications = arrayA.concat(arrayB);

            // jquery para cargar mas publicaciones
            $("html, body").animate({ scrollTop: $('html').prop("scrollHeight")}, 500);
          }

        } else {
          this.status = 'error';
        }
      }, error => {
        console.log(<any>error);
        this.status = 'error';

       }
    );

  }

  viewMore() {
    // se suma 1 a la pagina actual para cuando se de click cargue a la sigute pagina
    this.page = this.page + 1;
    // Si cumple la condicion no se podrá cargar más publicaciones ...
    if (this.page  === this.pages) {
      this.noMore = true;
    } 
    this.getPublications(this.user, this.page, true);
  }

    // Output
    refresh(event) {
      console.log(event)
      this.getPublications(this.user,1);
    }

}
